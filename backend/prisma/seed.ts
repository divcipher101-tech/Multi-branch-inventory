import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Nectar Products & Inventory...');

  // 1. Create a Branch
  const branch = await prisma.branch.create({
    data: {
      name: 'Lagos Central Hub',
      location: 'Ikeja, Lagos',
      type: 'WAREHOUSE'
    }
  });

  // 2. Create Products
  const productsData = [
    { sku: 'NCT-MNG-500', name: 'Nectar Mango Burst (500ml)', category: 'Juice', costPrice: 800, sellingPrice: 1200, reorderPoint: 500 },
    { sku: 'NCT-CIT-500', name: 'Nectar Citrus Zing (500ml)', category: 'Juice', costPrice: 800, sellingPrice: 1200, reorderPoint: 200 },
    { sku: 'NCT-APP-1000', name: 'Nectar Apple Crisp (1L)', category: 'Juice', costPrice: 1500, sellingPrice: 2100, reorderPoint: 100 },
    { sku: 'PKG-GLS-500', name: 'Premium Glass Bottles (Empty)', category: 'Packaging', costPrice: 100, sellingPrice: 150, reorderPoint: 2000 }
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const created = await prisma.product.create({ data: p });
    createdProducts.push(created);
  }

  // 3. Create Inventory (Inject Enterprise Scenarios: Low Stock, Expiring)
  
  // Healthy Stock, not expiring soon
  await prisma.inventory.create({
    data: {
      productId: createdProducts[0].id,
      branchId: branch.id,
      quantity: 1250,
      batchNumber: 'BCH-2026-07-01',
      expiryDate: new Date('2026-12-31')
    }
  });

  // LOW STOCK (below 200 reorder point), Expiring Soon!
  await prisma.inventory.create({
    data: {
      productId: createdProducts[1].id,
      branchId: branch.id,
      quantity: 45, // < 200
      batchNumber: 'BCH-2026-06-15',
      expiryDate: new Date('2026-08-10') // Less than 30 days
    }
  });

  // OUT OF STOCK
  await prisma.inventory.create({
    data: {
      productId: createdProducts[2].id,
      branchId: branch.id,
      quantity: 0,
      batchNumber: 'BCH-2026-05-10',
      expiryDate: new Date('2026-11-20')
    }
  });

  // Healthy Packaging
  await prisma.inventory.create({
    data: {
      productId: createdProducts[3].id,
      branchId: branch.id,
      quantity: 5000,
      batchNumber: 'PKG-BCH-001',
      expiryDate: null // Packaging doesn't expire
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
