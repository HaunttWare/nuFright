import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
<<<<<<< HEAD
=======
  const user = await prisma.user.create({ data: { id: 1, name: 'wilbur', email: 'lacurly00@bigman.com' } });
>>>>>>> 0f0102d869a5f19ee02e15d95f62cec3f8240052
  
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

