import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui'

export default fp(async(fastify:FastifyInstance) =>{
    await fastify.register(fastifySwagger, {
        openapi:{
            info:{
                title:"Task Management API",
                description:'Production-style Task Management API',
                version:'1.0.0'
                },
                servers:[{url:'http://localhost:3000'}],
                components: {
                    securitySchemes: {
                    bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
        },},    },
                security: [{ bearerAuth: [] }]
            }
        },
        );
        await fastify.register(fastifySwaggerUi,{
            routePrefix:'/docs',
            uiConfig:{
                deepLinking:false,
                docExpansion:'list'
            },
            staticCSP:true,
            transformStaticCSP: (header) => header
        });
    
    });
