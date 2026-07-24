import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/kpis', async (req, res) => {
  try {
    // 1. Total Revenue (Sum of all completed transactions)
    const transactions = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: 'COMPLETED' }
    });
    const totalRevenue = transactions._sum.amount || 0;

    // 2. Active Products
    const productsCount = await prisma.product.count({
      where: { status: 'ACTIVE' }
    });

    // 3. Low Stock Alerts
    // We fetch inventory that is <= their product's reorderPoint
    const inventories = await prisma.inventory.findMany({
      include: { product: true }
    });
    const lowStockCount = inventories.filter(inv => inv.quantity <= inv.product.reorderPoint).length;

    // 4. Total Sales Transactions
    const totalSales = await prisma.transaction.count({
      where: { type: 'SALE' }
    });

    res.json({
      totalRevenue,
      productsCount,
      lowStockCount,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard KPIs' });
  }
});

export default router;
