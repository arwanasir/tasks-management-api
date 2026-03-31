export const taskResponse = {
    type:'object',
        properties:{
            id:{type:'string'},
            title:{type:'string'},
            description:{type:'string'},
            status:{type:'string'},
            createdAt:{type:'string'},
            userId: { type: 'string' } 

        }
                
};

export const errorResponse = {
    type:'object',
        properties:{
            error:{type:'string'}
        }
                
}