import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui'

export default fp(async(fastify:FastifyInstance) =>{
    await fastify.register(swagger, {
        openapi:{
            info:{
                title:"Task Management API",
                description:'Production-style Task Management API',
                version:'1.0.0'
                },
                servers:[{url:'http://localhost:3000'}]
            }
        },
        );
        await fastify.register(swaggerUi,{
            routePrefix:'/docs',
            staticCSP:true,
        })
    });
