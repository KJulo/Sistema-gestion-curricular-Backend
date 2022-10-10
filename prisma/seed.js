const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
})
