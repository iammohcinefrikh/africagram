const {PrismaClient} = require("@prisma/client");
const {StatusCodes} = require("http-status-codes");
const Joi = require("joi")

const prisma = new PrismaClient;

const userSchima= Joi.object({
    userFirstName:Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.min": "Username should have at least 3 characters",
        "string.max": "Username should have at most 50 characters",
        "any.required": "Username is required"
    }),
    userLastName:Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.min": "Username should have at least 3 characters",
        "string.max": "Username should have at most 50 characters",
        "any.required": "Username is required"
    }),
    userEmail:Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.min": "Email should have at least 3 characters",
        "string.max": "Email should have at most 50 characters",
        "any.required": "Email is required"
    }),
    userPassword:Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
        "string.min": "password should have at least 8 characters",
        "any.required": "password is required"
    })
})

const editUser = async (request,response)=>{
    try {
        //chicking the user inputs
        userSchima.validate({userFirstName: request.body.userFirstName, userLastName: request.body.userLastName, userEmail: request.body.userEmail, userPassword: request.body.userPassword})
        // giting the email form the user object
        const userEmail = request.user.email;
        //checking if the email is alrady in the data base
        const existingemail= await prisma.user.findUnique({
            where:{
                userEmail:request.body.userEmail
            }
        });
        if(existingemail){
            return response.status(StatusCodes.CONFLICT).json({massage:"this emaile alraady used pleas try a nother email"});
        }

        const edit= await prisma.user.update({
            where:{
                userEmail
            },
            data:{
                userFirstName:request.body.userFirstName,
                userLastName:request.body.userLastName,
                userEmail:request.body.userEmail,
                userPassword:request.body.userPassword,
                userModificationDate:new Date()
            }
        })
        response.status(StatusCodes.ACCEPTED).json({
            massage:"you acount info have been updated",
            newinfo:edit
        })

    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
    finally{
        prisma.$disconnect
    }
}

module.exports = editUser