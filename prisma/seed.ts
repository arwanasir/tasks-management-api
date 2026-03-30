// import prisma from '../src/prisma/client.js';
import { PrismaClient } from "generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});


const prisma = new PrismaClient({adapter});
async function main(){
    const user = await prisma.user.upsert({
        where:{email:'abcde@example.com'},
        update:{},
        create:{
            email:'abcde@example.com',
            name:'abcde'
        },
    });
    console.log(`user created ${user.name} (ID: ${user.id})`);
};

main().catch((e) =>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
})

// npx prisma db seed






















// curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\": \"Final Demo Task\", \"userId\": \"	
// b796c9df-8997-4d6b-8a6b-ab812769f91a\", \"description\": \"This works because the User exists\"}"


// curl -X POST http://localhost:3000/tasks \
// -H "Content-Type: application/json" \
// -d '{
//     "title": "My first task",
//     "userId": "80d8c68c-0800-4a5c-813a-54c0a5bb318b",
//     "description": "This is a test task"
// }'