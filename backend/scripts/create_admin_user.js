const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@demo.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  // Find first store (required field)
  let store = await prisma.store.findFirst();
  if (!store) {
    store = await prisma.store.create({ data: { name: 'Demo Store', address: '123 Main St' } });
  }
  let admin = await prisma.staff.findUnique({ where: { email } });
  if (!admin) {
    admin = await prisma.staff.create({
      data: {
        name: 'Admin User',
        email,
        password: hashedPassword,
        storeId: store.id,
        isAdmin: true
      }
    });
    console.log('Admin user created:', { email, password });
  } else {
    console.log('Admin user already exists:', { email });
  }
}

main().finally(() => prisma.$disconnect());
