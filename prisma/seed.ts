// import prisma from '../src/prisma/client.js';
import { PrismaClient } from "generated/prisma/index.js";

const prisma = new PrismaClient();
async function main(){
    const user = await prisma.user.upsert({
        where:{email:'abc@example.com'},
        update:{},
        create:{
            email:'abc@example.com',
            name:'abc'
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