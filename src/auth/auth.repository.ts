import bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma/index.js';
import { User } from 'generated/prisma/index.js';

export async function createUser(prisma:PrismaClient,email:string,passwordHash:string, name:string):Promise<User>{
    const hash = await bcrypt.hash(passwordHash,10);
        const user = await prisma.user.create({
            data:{
                email,
                passwordHash: hash,
                name
            }
        })
        return user;
    
};

export async function findUserByEmail(prisma:PrismaClient,email:string):Promise<User | null>{
    const findUser = await prisma.user.findUnique({
        where:{
            email
        }
    });
    return findUser
    }
