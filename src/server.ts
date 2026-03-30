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















// curl -X POST http://localhost:3000/tasks \
    //  -H "Content-Type: application/json" \
    //  -d '{"title": "Complete Week 3 Demo", "description": "Show execution using cURL"}'


    // curl -X GET http://localhost:3000/tasks