import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'My First Post',
            content: 'This is my first post!',
            published: true,
          },
          {
            title: 'Draft Post',
            content: 'This is a draft post.',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Hello World',
            content: 'Welcome to my blog!',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
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
