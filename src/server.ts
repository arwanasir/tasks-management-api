import fastify from 'fastify';
import fastifyJwt from "@fastify/jwt";
import { taskRoutes } from './tasks/tasks.js';
import { userRoutes } from './auth/auth.routess.js';
import * as dotenv from 'dotenv';
dotenv.config();

const server = fastify();
server.register(taskRoutes);

server.register(fastifyJwt,{
    secret:process.env.SECRET_KEY! 
});

server.register(userRoutes,{prefixes:'/auth'});

const start = async ()=>{
    try{
        await server.listen({port:3000,host:'0.0.0.0'});
    console.log('server running on http://localhost:3000')

    }
    catch(e){
        server.log.error(e);
        process.exit(1);
    }
    
};

start();
















