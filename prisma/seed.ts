import { PrismaClient, Car, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users = Array.from({ length: 20 }).map(() => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  hashedPassword:
    '$2b$10$yKTspcEnXXlkB8hB32.DfOQkMrQtCbnHBuGLYQ.J8BmyDmgZxcaxa',
})) as User[];

const cars = Array.from({ length: 20 }).map(() => ({
  ownerId: users[Math.floor(Math.random() * users.length)].id,
  image: faker.image.transport(),
  name: faker.vehicle.vehicle(),
  description: faker.lorem.paragraph(),
  price: faker.datatype.number(),
  isAvaible: faker.datatype.boolean(),
})) as Car[];

async function main() {
  await prisma.user.deleteMany({});
  await prisma.car.deleteMany({});

  await prisma.user.createMany({ data: users });
  await prisma.car.createMany({ data: cars });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
