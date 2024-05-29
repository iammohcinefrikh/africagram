const { request } = require("express");
const upload = require("../helper/multerCofegeration.js");
const  path = require("path")
const Joi = require("joi")
const {StatusCodes} = require("http-status-codes");
const {PrismaClient}= require("@prisma/client");

const prisma = new PrismaClient;

const postSchema= Joi.object({
    postCaption: Joi.string()
    .min(3)
    .max(2200)
    .required()
    .messages({
        "string.min": "Caption must be at least 3 characters",
        "string.max": "Caption must be at most 2200 characters",
        "any.required": "Caption is required",
        "string.empty": "the Caption must not be empty"
    }),
    postImage: Joi.string()
    .required()
    .messages({
        "any.required": "Image is required",
        "string.empty": "the image must not be empty"
    })

});

const creatPost= async(request, response)=>{
        try {
            console.log(request.file)
            // making the image path clean of \\
            const imagePath = request.file.path.replace(/\\/g, '/') ;
            // valideing the inputs by joi
            postSchema.validate({postCaption: request.body.postCaption,postImage: request.file.path})
            // the creating if the post
            const newPost = await prisma.post.create({
                data:{
                    postCaption: request.body.postCaption,
                    postImage:  imagePath,
                    userId: parseInt(request.body.userId)
                }
            });
            // the resposns that we need 
            response.status(StatusCodes.CREATED).json({
                message: "Post created successfully",
                postinformation: newPost
            });
        } 
        // catching the error
        catch (error) {
            console.error(error)
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
        }
        finally{
            await prisma.$disconnect();
        }
    };


module.exports = creatPost