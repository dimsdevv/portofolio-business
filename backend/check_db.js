require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
});

async function main() {
  const projects = await prisma.project.findMany();
  console.log("Existing Slugs:", projects.map(p => p.slug));
  console.log("Total projects:", projects.length);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
