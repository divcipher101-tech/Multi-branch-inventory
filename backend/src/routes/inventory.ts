import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all inventory levels with product details and check against reorder points
router.get('/', async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: true,
        branch: true
      }
    });

    // Enterprise feature: Automated enrichment for low stock
    const enrichedInventory = inventory.map(item => ({
      ...item,
      isLowStock: item.quantity <= item.product.reorderPoint,
      isExpiringSoon: item.expiryDate 
        ? new Date(item.expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000 // 30 days
        : false
    }));

    res.json(enrichedInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Update or Create Inventory (e.g. Receive Stock)
router.post('/receive', async (req, res) => {
  try {
    const { productId, branchId, quantity, batchNumber, expiryDate } = req.body;
    
    // Check if it exists
    const existing = await prisma.inventory.findUnique({
      where: {
        productId_branchId: { productId, branchId }
      }
    });

    if (existing) {
      const updated = await prisma.inventory.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + parseInt(quantity),
          batchNumber: batchNumber || existing.batchNumber,
          expiryDate: expiryDate ? new Date(expiryDate) : existing.expiryDate
        }
      });
      return res.json(updated);
    } else {
      const created = await prisma.inventory.create({
        data: {
          productId,
          branchId,
          quantity: parseInt(quantity),
          batchNumber,
          expiryDate: expiryDate ? new Date(expiryDate) : null
        }
      });
      return res.status(201).json(created);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to receive inventory' });
  }
});

export default router;
