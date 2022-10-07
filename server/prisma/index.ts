import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  //const user = await prisma.user.create({ data: { id: 1, name: 'wilbur', email: 'lacurly00@bigman.com' } });
  
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

