const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const locations = await prisma.location.findMany({ select: { id: true } });
  console.log(locations);
}

main().finally(() => prisma.$disconnect());
