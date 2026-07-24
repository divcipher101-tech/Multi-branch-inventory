import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ==========================================
// BRANCHES API
// ==========================================
router.get('/branches', async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      include: { _count: { select: { users: true, inventory: true } } }
    });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
});

router.post('/branches', async (req, res) => {
  try {
    const branch = await prisma.branch.create({ data: req.body });
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create branch' });
  }
});

// ==========================================
// AUDIT LOGS API
// ==========================================
router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { user: { select: { name: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// ==========================================
// STOCK TRANSFERS API
// ==========================================
router.get('/transfers', async (req, res) => {
  try {
    const transfers = await prisma.stockTransfer.findMany({
      include: {
        product: { select: { name: true, sku: true } },
        fromBranch: { select: { name: true } },
        toBranch: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
});

// ==========================================
// EXPENSES & CASH MANAGEMENT API
// ==========================================
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        branch: { select: { name: true } },
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// ==========================================
// CUSTOMERS & SUPPLIERS API
// ==========================================
router.get('/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

export default router;
