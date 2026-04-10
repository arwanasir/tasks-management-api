import {create, listTasks,getTaskById,updateTask,deleteTask } from "../tasks.repository.js";

export async function createTaskHandler(request:any,reply:any){
    {           
        const prisma = request.server.prisma;
        const {id:userId} = request.user as {id:string};         
        const {title, status} = request.body as {title:string,status?:string}
        const update_tasks = await create(prisma,userId,title,status);
            
        reply.code(200).send(update_tasks);
    
    } 
};

export async function listTaskHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const {id:userId} = request.user as {id:string};
    const {status} = request.query as {status?:string};
    const listTask = await listTasks(prisma,userId,status);
    reply.code(200).send(listTask);
};

export async function getByIdHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const {id:taskId} = request.params as {id:string}
    const {id:userId} = request.user as {id:string};
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
    const {id:taskId} = request.params as {id:string};
    const {id:userId} = request.user as {id:string}
    const {title, status} = request.body as {title?:string,status?:string}
    const update_tasks = await updateTask(prisma,taskId,userId,title,status); 
    reply.code(200).send(update_tasks);

 };
 
export async function deleteTaskHandler(request:any,reply:any){
    const prisma = request.server.prisma;
    const {id:taskId} = request.params as {id:string};
    const {id:userId} = request.user as {id:string};

    const delete_task = await deleteTask(prisma,taskId,userId);

    if (!delete_task) {
        const error = new Error('Task not found or unauthorized');
        (error as any).statusCode = 404;
        throw error;
    }
    reply.code(204).send()

    };
