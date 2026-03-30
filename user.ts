import { prisma } from './src/prisma/client.ts'; // adjust path to your prisma client

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'demo@example.com',
            name: 'Demo User'
        }
    });
    console.log('User ID:', user.id);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });