import { Router } from 'express';
import { PrismaClient, TxType, PayMethod, TxStatus } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Record a new POS Sale
router.post('/record', async (req, res) => {
  try {
    const { userId, branchId, items, method } = req.body;
    // items is an array of { productId, quantity, price }

    if (!items || items.length === 0) return res.status(400).json({ error: 'No items in sale' });

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Enterprise feature: Use a Prisma Transaction to ensure atomic operation
    // We must create the Transaction, create SaleItems, and decrement Inventory simultaneously
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the Transaction record
      const transaction = await tx.transaction.create({
        data: {
          type: TxType.SALE,
          amount: totalAmount,
          method: method as PayMethod,
          status: TxStatus.COMPLETED,
          userId,
          branchId
        }
      });

      // 2. Create Sale Items & Update Inventory
      for (const item of items) {
        await tx.saleItem.create({
          data: {
            transactionId: transaction.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtSale: item.price
          }
        });

        // Decrement inventory
        const inv = await tx.inventory.findUnique({
          where: { productId_branchId: { productId: item.productId, branchId } }
        });

        if (!inv || inv.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ID: ${item.productId}`);
        }

        await tx.inventory.update({
          where: { id: inv.id },
          data: { quantity: inv.quantity - item.quantity }
        });
      }

      return transaction;
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to record sale' });
  }
});

// Get recent transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: { select: { name: true } },
        branch: { select: { name: true } },
        items: { include: { product: true } }
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
