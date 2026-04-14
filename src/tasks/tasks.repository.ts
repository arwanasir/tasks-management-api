import { Task, PrismaClient } from "generated/prisma/index.js";
import { formatTaskTitle } from "../utils/formatter.js";

export async function create(prisma:PrismaClient,title:string,userId:string, description?:string):Promise<Task | null> {  
    try{
        const formattedTitle = formatTaskTitle(title);
        const task = await prisma.task.create({
        data:{
            title:formattedTitle,
            userId,
            description,

        }
    });
    return task;
    
    }
    catch(e){
        console.error(e);
        return null;
}};

export async function listTasks(prisma:PrismaClient, userId:string,status?:string):Promise<Task[]>{
    
    try{
        const listTask = await prisma.task.findMany({
        where:{
            userId,
            status
        }
});
    return listTask; 

    }
    catch(e){
        console.error(e);
        return [];
    };
};

export async function getTaskById(prisma:PrismaClient,taskId:string,userId:string):Promise<Task|null>{
    try{
         const getTask = await prisma.task.findUnique({
        where:{
            id:taskId,
            userId:userId
        }
    })
    return getTask;

    }
    catch(e){
        console.error(e);
        return null;
    };
   
};

export async function updateTask(prisma:PrismaClient,taskId:string,userId:string, title?:string,status?:string):Promise<Task | null>{
    try{
        const update = await prisma.task.update({
        where:{
            id:taskId,
            userId:userId
        },
        data:{
            title,
            status
        }
    })
    return update;

    }
    catch(e){
        console.error(e);
        return null;
    };   
};

export async function deleteTask(prisma:PrismaClient,taskId:string,userId:string):Promise<Task | null>{
    try{
        const delete_task = await prisma.task.delete({
            where:{
                id:taskId,
                userId:userId
            }
        });
        return delete_task;
    }
    catch(e){
        console.error(e);
        return null;
    };
}



























