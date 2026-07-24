import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { sku, name, category, costPrice, sellingPrice, reorderPoint } = req.body;
    
    const product = await prisma.product.create({
      data: {
        sku,
        name,
        category,
        costPrice: parseFloat(costPrice),
        sellingPrice: parseFloat(sellingPrice),
        reorderPoint: reorderPoint ? parseInt(reorderPoint) : 100,
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
