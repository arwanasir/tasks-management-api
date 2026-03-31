import { FastifyReply,FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';
import { createUser,findUserByEmail } from "./auth.repository.js";

export async function registerHandler(req:FastifyRequest,reply:FastifyReply){
    const {email,passwordHash} = req.body as {email:string,passwordHash:string};
  const findUser = await findUserByEmail(email);
  if(findUser){
    return reply.code(400).send({
      message: 'User already exists with this email',
    });
  };
  try{
    const create_user = await createUser(email,passwordHash);
    return reply.code(201).send({
      id:create_user.id,
      name:create_user.name,
      email:create_user.email,
      createdAt:create_user.createdAt
    });
  }catch(e){
    return reply.code(500).send(e);
  }
  
};

export async function loginHandler(req:FastifyRequest,reply:FastifyReply){
    try{

      const {email,passwordHash} = req.body as {email:string,passwordHash:string};
      const find_user = await findUserByEmail(email);

      if(!find_user){

        return reply.code(404).send({
        message: 'User doesnt exists with this email',
      });
      };
      const isValid = find_user && (await bcrypt.compare(passwordHash,find_user.passwordHash));

      if (!isValid) {
        return reply.code(401).send({
        message: 'Invalid email or password',
        });
      }

      const payload = {
        id:find_user.id,
        email:find_user.email
      };
      const token =await reply.jwtSign(payload);
      return reply.code(200).send({accessToken:token});
    }
    catch(e){
      return reply.code(500).send({message:'internal server error'})
    }
}