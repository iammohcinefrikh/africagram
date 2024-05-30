const {PrismaClient}= require("@prisma/client");
const { request, response, json } = require("express");
const {StatusCodes}=require("http-status-codes")
const prisma = new PrismaClient();
const Joi = require("joi");

const commentSchema = Joi.object({
    commentMessage:Joi.string()
    .min(3)
    .max(2200)
    .required()
    .messages({
        "string.empty":"the comment must not be empty",
        "string.min":"the comment must be at least 3 characters long",
        "string.max":"the comment must be at most 2200 characters long"
    }),
})

const newcomment = async(request,response)=>{
    try {
        commentSchema.validate({commentMessage:request.body.commentMessage})
        const postId= request.params.postId;
        const userEmail= request.user.email;
        const commentor= await prisma.user.findUnique({
            where:{
                userEmail:userEmail
            }
        });

        const newcomment=await prisma.comment.create({
            data:{
                commentMessage:request.body.commentMessage,
                postId: parseInt(postId),
                userId:commentor.userId
            }
        })
        response.status(StatusCodes.ACCEPTED).json(newcomment)
    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
    finally{
        prisma.$disconnect
    }
}


module.exports= newcomment