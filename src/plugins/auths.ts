import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import fp from 'fastify-plugin';
import config from '../config/index.js';

export default fp(async(fastify:FastifyInstance) => {
    fastify.register(fastifyJwt,{
        secret:config.jwtsecret
    })

    fastify.addHook('onRequest',async(request,reply)=>{
        console.log(request.headers);
            if(request.url.includes('/auth/login') || request.url.includes('/auth/register') || request.url.includes('/docs')){
                return;
            };

        try{
            await request.jwtVerify();
        }
        catch(e){
            fastify.log.error(e)
            return reply.code(401).send({error:'unauthorized.!'})

        }
    })

 })