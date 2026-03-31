// // import prisma from '../src/prisma/client.js';
// import { PrismaClient } from "generated/prisma/index.js";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });


// const prisma = new PrismaClient({adapter});
// async function main(){
// //     const user = await prisma.user.upsert({
// //     //     where:{email:'abcde@example.com'},
// //     //     update:{},
// //     //     // create:{
// //     //     //     email:'abcde@example.com',
// //     //     //     name:'abcde'
// //     //     // },
// //     // });
// //     // console.log(`user created ${user.name} (ID: ${user.id})`);
// // };

// main().catch((e) =>{
//     console.error(e);
//     process.exit(1);
// }).finally(async()=>{
//     await prisma.$disconnect();
// });
