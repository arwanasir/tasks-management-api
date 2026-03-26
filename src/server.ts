import fastify from 'fastify';
import { taskRoutes } from './tasks/tasks.js';

const server = fastify();
server.register(taskRoutes);

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