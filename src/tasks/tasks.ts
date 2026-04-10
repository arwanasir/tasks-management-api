import { FastifyInstance } from "fastify";
import { createTaskSchema,getTaskSchema,getByIdSchema,putTaskSchema,deleteTaskSchema } from "src/tasks/schema/schema.js";
import { createTaskHandler,listTaskHandler,getByIdHandler,updateTaskHandler,deleteTaskHandler } from "src/tasks/schema/task.controllers.js";

export async function taskRoutes(fastify:FastifyInstance){
   
    fastify.route({
        method:'POST',
        url:'/tasks',
        schema:createTaskSchema,
        handler:createTaskHandler
    });

    fastify.route({
        method:'GET',
        url:'/tasks',
        schema:getTaskSchema,
        handler:listTaskHandler
    });

    fastify.route({
        method:'GET',
        url:'/tasks/:id',
        schema:getByIdSchema,
        handler:getByIdHandler

    });

    fastify.route({
        method:'PUT',
        url:'/tasks/:id',
        schema:putTaskSchema,
        handler:updateTaskHandler
    });

    fastify.route({
        method:'DELETE',
        url:'/tasks/:id',
        schema:deleteTaskSchema,
        handler:deleteTaskHandler
    });


};

