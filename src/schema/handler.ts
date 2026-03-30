import { create,listTasks,getTaskById,updateTask,deleteTask } from "src/tasks.repository.js";

export async function createTaskHandler(request:any,reply:any){
    {
                const {id} = request.params as {id:string};
                const {title, status} = request.body as {title?:string,status?:string}
                const update_tasks = await updateTask(id,title,status);
            
            if(!update_tasks){
                return reply.code(404).send({error:'tasks not found'});
            } 
            reply.code(200).send(update_tasks);
    
     } 
}

export async function listTaskHandler(request:any,reply:any){
                const {userId,status} = request.query as {userId:string, status?:string};
                const listTask = await listTasks(userId,status);
                if(!listTask){
                    return reply.code(404).send({error:"couldn't list task"});
                }
                reply.code(200).send(listTask);
            };

export async function getByIdHandler(request:any,reply:any){
                    const {id} = request.params as {id:string};
                    const getById = await getTaskById(id);
                    if(!getById){
                        return reply.code(404).send({error:"tasks not found"});
                    }
                    reply.code(200).send(getById)
                };

export async function updateTaskHandler(request:any,reply:any){
            const {id} = request.params as {id:string};
            const {title, status} = request.body as {title?:string,status?:string}
            const update_tasks = await updateTask(id,title,status);
        
        if(!update_tasks){
            return reply.code(404).send({error:'tasks not found'});
        } 
        reply.code(200).send(update_tasks);

 };

 export async function deleteTaskHandler(request:any,reply:any){
        const {id} = request.params as {id:string};
        const delete_task = await deleteTask(id);
        if(!delete_task){
            return reply.code(404).send({error:'tasks not found'});
        }
        reply.code(204).send()

    };
