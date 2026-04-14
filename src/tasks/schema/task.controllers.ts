import {create, listTasks,getTaskById,updateTask,deleteTask } from "../tasks.repository.js";

export async function createTaskHandler(request:any,reply:any){
    {           
        const prisma = request.server.prisma;
        const userId = request.user.id;         
        const {title, description} = request.body as {title:string, description?:string}
        const create_tasks = await create(prisma,title,userId, description);
        if (!create_tasks) {
            const error =new Error('fialed to create task');
            (error as any).statuscode = 500; 
            throw error;
            
        }
        reply.code(201).send(create_tasks);
    
    } 
};

export async function listTaskHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const userId = request.user.id;
    const {status} = request.query as {status?:string};
    const listTask = await listTasks(prisma,userId,status);
    reply.code(200).send(listTask);
};

export async function getByIdHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const taskId = request.params.id;
    const userId = request.user.id;
    const getById = await getTaskById(prisma,taskId,userId);
    if (!getById) {
        const error = new Error('Task not found');
        (error as any).statusCode = 404;
        throw error;
    }
    reply.code(200).send(getById);
};

export async function updateTaskHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const taskId = request.params.id;
    const userId = request.user.id;
    const {title, status} = request.body as {title?:string,status?:string}
    const update_tasks = await updateTask(prisma,taskId,userId,title,status); 
    if(!update_tasks){
        const error = new Error('Task not found or unauthorized');
        (error as any).statuscode = 404;
        throw error;
    }
    reply.code(200).send(update_tasks);

 };
 
export async function deleteTaskHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const taskId = request.params.id;
    const userId = request.user.id;

    const delete_task = await deleteTask(prisma,taskId,userId);

    if (!delete_task) {
        const error = new Error('Task not found or unauthorized');
        (error as any).statusCode = 404;
        throw error;
    }
    reply.code(204).send()

    };
