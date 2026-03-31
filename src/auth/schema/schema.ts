import { createUserResponse,loginUserResponse } from "./response.js"

export const registerSchema = {
     body:{
                type:'object',
                required:['email','password'],
                properties:{
                    email:{type:'string'},
                    password:{type:'string'},
                }
            
        },
        response:{
            201:createUserResponse
        }

};

export const loginSchema = {
    body:{
         type:'object',
        required:['email'],
        properties:{
            email:{type:'string'}
    }
    },
    response:{
        200:loginUserResponse
    }
   
}