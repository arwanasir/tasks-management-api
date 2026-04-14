import { FastifyReply,FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';
import { createUser,findUserByEmail } from "./auth.repository.js";

export async function registerHandler(req:FastifyRequest,reply:FastifyReply){

  const prisma = req.server.prisma;
  const {email,password, name} = req.body as {email:string,password:string, name:string};
  const create_user = await createUser(prisma,email,password, name);
    return reply.code(201).send({
      id:create_user.id,
      name:create_user.name,
      email:create_user.email,
      createdAt:create_user.createdAt
    });
 
  
};

export async function loginHandler(req:FastifyRequest,reply:FastifyReply){
  console.log("--- DEBUG START ---");
  const prisma = req.server.prisma;
  const {email,password} = req.body as {email:string,password:string};
  const find_user = await findUserByEmail(prisma,email);
  const isValid = find_user && (await bcrypt.compare(password,find_user.passwordHash));
  
  // console.log("Password received:", password);
  // console.log("Hash from DB:", find_user?.passwordHash);
  // console.log("Type of Hash:", typeof find_user?.passwordHash);
  // console.log("--- DEBUG END ---");

  if (!isValid) {
    const error = new Error('Invalid email or password');
    (error as any).statusCode = 401;
    throw error;
    
    
  };
    const payload = {
      id: find_user.id,
      email: find_user.email
    };
    const token = await reply.jwtSign(payload);
    return reply.code(200).send({ accessToken: token });
  
  
}
   
