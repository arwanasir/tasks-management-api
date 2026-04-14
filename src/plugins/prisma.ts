import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../../generated/prisma/index.js';
import config from 'src/config/index.js';

const adapter = new PrismaPg({
    connectionString:config.dburl!
})

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export default fp(async (fastify: FastifyInstance) => {
    const prisma = new PrismaClient({adapter});
    await prisma.$connect();
    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
});
 
 
 