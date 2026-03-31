export const createUserResponse = {
    type:'object',
            properties:{
                id:{type:'string'},
                name:{type:'string'},
                email:{type:'string'},
                createdAt:{type:'string'}

            }
};
export const loginUserResponse = {
    type:'object',
    properties:{
        accessToken:{type:'string'}
    }
}