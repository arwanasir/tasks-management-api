import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default fp(async(fastify:FastifyInstance) => {
    fastify.setErrorHandler((error:any,request:FastifyRequest, reply:FastifyReply) =>{
        request.log.error(error);
        
        if(error.validation){
            return reply.status(400).send({error:'ValidationError',message:error.message});
        };

        if(error.statusCode === 401){
            return reply.status(401).send({
                error:'Unauthorized',
                message:'you must be logged in to access this resource '
            });
        };
        if(error.statusCode === 403){
            return reply.status(403).send({
                error:'ForbiddenError',
                message:'you do not have the permission to access this resources'
            });
        };
        if(error.name === 'NotFoundError' || error.code === 'P2025'){
            return reply.status(404).send({
                error:'NotFoundError',
                message:'the request resource was not found'
            });
        };
        if(error.name === 'ConflictError' || error.code === 'P2002'){
            return reply.status(409).send({
                error:'ConflictError',
                message:'A record with this value already exists'
            });
        };

        // default values for like when the error aint known 
        return reply.status(500).send({
            error:'InternalServerError',
            message:'An unexpected error occured on the server'
        });
    })

} )