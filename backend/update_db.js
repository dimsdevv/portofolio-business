const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete "Beri Kopi" project if it exists
  try {
    await prisma.project.delete({
      where: { slug: 'beri-kopi' }
    });
    console.log('Deleted Beri Kopi project');
  } catch (err) {
    console.log('Beri Kopi project not found or already deleted');
  }

  // Update existing projects to be featured by default
  const result = await prisma.project.updateMany({
    where: { isFeatured: false },
    data: { isFeatured: true }
  });
  console.log(`Updated ${result.count} projects to be featured`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
