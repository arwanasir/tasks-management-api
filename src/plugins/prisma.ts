import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import { PrismaClient } from '../../generated/prisma/index.js';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export default fp(async (fastify: FastifyInstance) => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
});
 
 
 