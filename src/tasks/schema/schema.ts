import { taskResponse} from "./response.js"; 

export const createTaskSchema = {
    security: [{ bearerAuth: [] }],
            body:{
                type:'object',
                required:['title'],
                properties:{
                    title:{type:'string'},
                    description: {type: 'string'}
                }
            },
            response:{
                201:taskResponse,

            }
        };

export const getTaskSchema = {
    security: [{ bearerAuth: [] }],
            querystring:{
                type:'object',
                properties:{
                    status:{type:'string'},
                }
            },
            response:{
                200:{
                    type:'array',
                    items:taskResponse,
            }
        }};

export const getByIdSchema = {
    security: [{ bearerAuth: [] }],
        params:{
            type:'object',
                properties:{
                    id:{type:'string'},
}},
        response:{
            200:taskResponse
            }};


export const putTaskSchema ={
    security: [{ bearerAuth: [] }],
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
    security: [{ bearerAuth: [] }],
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