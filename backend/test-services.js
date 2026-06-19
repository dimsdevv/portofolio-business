const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany();
  console.log(services);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
