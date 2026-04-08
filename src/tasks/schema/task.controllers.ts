import {create, listTasks,getTaskById,updateTask,deleteTask } from "../tasks.repository.js";

export async function createTaskHandler(request:any,reply:any){
    {
                const {id:userId} = request.user as {id:string};
                const {title, status} = request.body as {title:string,status?:string}
                const update_tasks = await create(userId,title,status);
            
            if(!update_tasks){
                return reply.code(404).send({error:'tasks not found'});
            } 
            reply.code(200).send(update_tasks);
    
    } 
};

export async function listTaskHandler(request:any,reply:any){
    const {id:userId} = request.user as {id:string};
    const {status} = request.query as {status?:string};
    const listTask = await listTasks(userId,status);
    if(!listTask){
        return reply.code(404).send({error:"couldn't list task"});
    }
    reply.code(200).send(listTask);
};

export async function getByIdHandler(request:any,reply:any){
    const {id:taskId} = request.params as {id:string}
    const {id:userId} = request.user as {id:string};
    const getById = await getTaskById(taskId,userId);
    if(!getById){
        return reply.code(404).send({error:"tasks not found"});
    }
    reply.code(200).send(getById)
};

export async function updateTaskHandler(request:any,reply:any){
            const {id:taskId} = request.params as {id:string};
            const {id:userId} = request.user as {id:string}
            const {title, status} = request.body as {title?:string,status?:string}
            const update_tasks = await updateTask(taskId,userId,title,status);
        
        if(!update_tasks){
            return reply.code(404).send({error:'tasks not found'});
        } 
        reply.code(200).send(update_tasks);

 };
 
export async function deleteTaskHandler(request:any,reply:any){
    const {id:taskId} = request.params as {id:string};
    const {id:userId} = request.user as {id:string};
    const delete_task = await deleteTask(taskId,userId);
    if(!delete_task){
        return reply.code(404).send({error:'tasks not found'});
    }
    reply.code(204).send()

    };
