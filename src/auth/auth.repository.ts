import bcrypt from 'bcrypt';
import prisma from '../prisma/client.js';
import { User } from 'generated/prisma/index.js';

export async function createUser(email:string,passwordHash:string):Promise<User>{
    const hash = await bcrypt.hash(passwordHash,10);
        const user = await prisma.user.create({
            data:{
                email,
                passwordHash: hash
            }
        })
        return user;
    
};

export async function findUserByEmail(email:string):Promise<User | null>{
    const findUser = await prisma.user.findUnique({
        where:{
            email
        }
    });
    return findUser
    }
