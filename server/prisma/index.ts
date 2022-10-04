import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
 const user = await prisma.test.create({ data: { name: "bigfede"}});

  console.log(`${user} has totally connected to the database yo!`);
};

main()
.then(async () => {
  await prisma.$disconnect();
})
.catch( async(e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})

