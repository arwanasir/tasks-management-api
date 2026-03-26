import { Task } from "generated/prisma/index.js";
import prisma from "./prisma/client.js";


export async function create(title:string,userId:string, description?:string):Promise<Task | null> { //why 
    try{
        const task = await prisma.task.create({
        data:{
            title,
            description,
            userId,
        }
    });
    return task;
    
    }
    catch(e){
        console.error(e);
        return null;
    };

};
    

export async function listTasks(userId:string,status?:string):Promise<Task[]>{
    
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

export async function getTaskById(id:string):Promise<Task|null>{
    try{
         const getTask = await prisma.task.findUnique({
        where:{id}
    })
    return getTask;

    }
    catch(e){
        console.error(e);
        return null;
    };
   
};

export async function updateTask(id:string, title?:string,status?:string):Promise<Task | null>{
    try{
        const update = await prisma.task.update({
        where:{id},
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

export async function deleteTask(id:string):Promise<Task | null>{
    try{
        const delete_task = await prisma.task.delete({
            where:{id}
        });
        return delete_task;
    }
    catch(e){
        console.error(e);
        return null;
    };
}
