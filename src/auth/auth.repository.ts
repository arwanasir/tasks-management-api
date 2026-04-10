import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client/extension';
import { User } from 'generated/prisma/index.js';

export async function createUser(prisma:PrismaClient,email:string,passwordHash:string):Promise<User>{
    const hash = await bcrypt.hash(passwordHash,10);
        const user = await prisma.user.create({
            data:{
                email,
                passwordHash: hash
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
