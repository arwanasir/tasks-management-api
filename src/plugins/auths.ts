import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import fp from 'fastify-plugin';
import config from '../config/index.js';

export default fp(async(fastify:FastifyInstance) => {
    fastify.register(fastifyJwt,{
        secret:config.jwtsecret
    })

    fastify.addHook('onRequest',async(request,reply)=>{
        const path = request.routeOptions?.url
            if(path === '/logins' || path === '/register'){
                return;
            };

        try{
            await request.jwtVerify();
        }
        catch(e){
            reply.code(401).send({error:'unauthorized. please log in!'})

        }
    })

 })