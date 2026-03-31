import { FastifyInstance } from "fastify";
import { registerSchema,loginSchema } from "./schema/schema.js";
import { registerHandler,loginHandler } from "./auth.controllers.js";

export async function userRoutes(fastify:FastifyInstance){
    fastify.route({
        method:'POST',
        url:'/register',
        schema:registerSchema,
        handler:registerHandler
    });

    fastify.route({
        method:'POST',
        url:'/login',
        schema:loginSchema,
        handler:loginHandler
    });

}