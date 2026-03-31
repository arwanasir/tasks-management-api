import { Task } from "generated/prisma/index.js";
import prisma from "src/prisma/client.js";


export async function create(title:string,userId:string, description?:string):Promise<Task | null> { //why 
    try{
        const task = await prisma.task.create({
        data:{
            title,
            userId,
            description
        }
    });
    return task;
    
    }
    catch(e){
        console.error(e);
        return null;
    

}};

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

export async function getTaskById(taskId:string,userId:string):Promise<Task|null>{
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

export async function updateTask(taskId:string,userId:string, title?:string,status?:string):Promise<Task | null>{
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

export async function deleteTask(taskId:string,userId:string):Promise<Task | null>{
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



























// curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\": \"Finish Demo\", \"content\": \"Recording Week 3\", \"userId\": \"b796c9df-8997-4d6b-8a6b-ab812769f91a\"}"




// curl -X POST http://localhost:3000/tasks \
//      -H "Content-Type: application/json" \
//      -d '{
//        "title": "Finish Demo", 
//        "userId": "b796c9df-8997-4d6b-8a6b-ab812769f91a"
//        "description": "Recording the Week 3 project execution",
       
//      }'


//      curl -X POST http://localhost:3000/tasks \
//      -H "Content-Type: application/json" \
//      -d "{
//        \"title\": \"Week 3 Task\", 
//        \"description\": \"Execution properly demonstrated\", 
//        \"userId\": \"b796c9df-8997-4d6b-8a6b-ab812769f91a\"
//      }"