const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const zones = await prisma.zone.findMany({ select: { id: true, name: true, storeId: true } });
  console.log(zones);
}

main().finally(() => prisma.$disconnect());
