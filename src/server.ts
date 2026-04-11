import fastify from 'fastify';
import { taskRoutes } from './tasks/tasks.js';
import { userRoutes } from './auth/auth.routess.js';
import prismaPlugin from './plugins/prisma.js';
import authPlugin from './plugins/auths.js';
import errorHandler from './plugins/error-handler.js';
import swaggerPlugin from './plugins/swagger.js';

export const buildApp = async() =>{

    const server = fastify({logger:true});
    server.register(taskRoutes);

    server.register(userRoutes,{prefixes:'/auth'});
    server.register(prismaPlugin);
    server.register(authPlugin);
    server.register(errorHandler);
    server.register(swaggerPlugin);

    return server;
}

const start = async ()=>{
    const server = await buildApp();
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
















