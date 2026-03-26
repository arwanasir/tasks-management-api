import { FastifyInstance } from "fastify";
import {create,listTasks, getTaskById,updateTask,deleteTask} from '../tasks.repository.js';

export async function taskRoutes(fastify:FastifyInstance){
    fastify.route({
        method:'POST',
        url:'/tasks',
        schema:{
            body:{
                type:'object',
                required:['userId','title'],
                properties:{
                    title:{type:'string'},
                    userId:{type:'string'},
                    description: {type: 'string'}
                }
            },
            response:{
                201:{
                    type:'object',
                    properties:{
                        id:{type:'string'},
                        title:{type:'string'},
                        description:{type:'string'},
                        status:{type:'string'},
                        createdAt:{type:'string'},
                        userId: { type: 'string' } 

                    }
                },
                500:{
                    type:'object',
                    properties:{
                        error:{type:'string'}
                    }
                }

            }
        },
         handler:async(request,reply)=>{
                const {title,userId,description} = request.body as {title:string, userId:string,description?:string};
                const createTask = await create(title,userId,description);
                if(!createTask){
                    return reply.code(500).send({error:"couldn't create task"});
                }
                reply.code(201).send(createTask);
            }
    });
    fastify.route({
        method:'GET',
        url:'/tasks',
        schema:{
            querystring:{
                type:'object',
                properties:{
                    userId:{type:'string'},
                    status:{type:'string'},
                }
            },
            response:{
                200:{
                    type:'array',
                    items:{
                        type:'object',
                        properties:{
                            id:{type:'string'},
                            title:{type:'string'},
                            description:{type:'string'},
                            status:{type:'string'},
                            createdAt:{type:'string'},
                            userId: { type: 'string' } 

                    }} 
                },
                404:{
                    type:'object',
                    properties:{
                        error:{type:'string'}
                    }
                }
            }
        },
            handler:async (request,reply)=>{
                const {userId,status} = request.query as {userId:string, status?:string};
                const listTask = await listTasks(userId,status);
                if(!listTask){
                    return reply.code(404).send({error:"couldn't list task"});
                }
                reply.code(200).send(listTask);
            }
});
fastify.route({
    method:'GET',
    url:'/tasks/:id',
    schema:{
        params:{
            type:'object',
                properties:{
                    id:{type:'string'},
}},
    response:{
            200:{
                type:'object',
                    properties:{
                        id:{type:'string'},
                        title:{type:'string'},
                        description:{type:'string'},
                        status:{type:'string'},
                        createdAt:{type:'string'},
                        userId: { type: 'string' } 

                    }} 
                ,
            404:{
                    type:'object',
                    properties:{
                        error:{type:'string'}
                    }
                }}},
                handler:async(request,reply)=>{
                    const {id} = request.params as {id:string};
                    const getById = await getTaskById(id);
                    if(!getById){
                        return reply.code(404).send({error:"tasks not found"});
                    }
                    reply.code(200).send(getById)
                }
        })
    ;
    fastify.route({
        method:'PUT',
        url:'/tasks/:id',
        schema:{
            params:{
                type:'object',
                properties:{
                    id:{type:'string'}
                }
            },
            body:{
                type:'object',
                required:['title'],
                properties:{
                    title:{type:'string'},
                    status:{type:'string'}

                }
            },
            response:{
                200:{
                    type:'object',
                        properties:{
                            id:{type:'string'},
                            title:{type:'string'},
                            description:{type:'string'},
                            status:{type:'string'},
                            createdAt:{type:'string'},
                            userId: { type: 'string' } 

                    }
                },
                404:{
                    type:'object',
                    properties:{
                        error:{type:'string'}
                    }
                }
            }
        
        },
        handler:async(request,reply)=>{
            const {id} = request.params as {id:string};
            const {title, status} = request.body as {title?:string,status?:string}
            const update_tasks = await updateTask(id,title,status);
        
        if(!update_tasks){
            return reply.code(404).send({error:'tasks not found'});
        } 
        reply.code(200).send(update_tasks);

 } 
});
fastify.route({
    method:'DELETE',
    url:'/tasks/:id',
    schema:{
        params:{
            type:'object',
            properties:{
                id:{type:'string'}
            }
        },
        response:{
                204:{
                    type:'object',
                },
            404:{
                    type:'object',
                    properties:{
                        error:{type:'string'}
                    }
                }}
    },
    handler:async(request,reply)=>{
        const {id} = request.params as {id:string};
        const delete_task = await deleteTask(id);
        if(!delete_task){
            return reply.code(404).send({error:'tasks not found'});
        }
        reply.code(204).send()

    }
})


};

