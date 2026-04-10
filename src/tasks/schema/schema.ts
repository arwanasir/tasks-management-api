import { taskResponse} from "./response.js"; 

export const createTaskSchema = {
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
                201:taskResponse,

            }
        };

export const getTaskSchema = {
            querystring:{
                type:'object',
                properties:{
                    userId:{type:'string'},
                    status:{type:'string'},
                }
            },
            response:{
                200:taskResponse,
            }
        };

export const getByIdSchema = {
        params:{
            type:'object',
                properties:{
                    id:{type:'string'},
}},
        response:{
            200:taskResponse
            }};


export const putTaskSchema ={
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
                200:taskResponse,
            }
        
        };

export const deleteTaskSchema = {
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
            
        }
    };