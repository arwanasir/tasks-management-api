
// use this command to run it "npx prisma db seed"

import prisma from '../src/prisma/client';
async function main(){
    const user = await prisma.user.upsert({
        where:{email:'abc@example.com'},
        update:{},
        create:{
            email:'abc@example.com',
            name:'abc'
        },
    });
    console.log(`created a user ${user.name} (ID: ${user.id})`)
};

main().catch((e)=>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});