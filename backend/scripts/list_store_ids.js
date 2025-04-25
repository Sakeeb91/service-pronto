const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stores = await prisma.store.findMany({ select: { id: true, name: true } });
  console.log(stores);
}

main().finally(() => prisma.$disconnect());
