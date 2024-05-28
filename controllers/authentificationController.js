const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const {StatusCodes}= require("http-status-codes")
require("dotenv").config();
const prisma = new PrismaClient;

const registerSchema = Joi.object({
    userFirstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        "any.required": "First name is required!",
        "string.empty": "First name should not be empty!",
        "string.min": "First name should have at least {#limit} characters!",
        "string.max": "First name should have at most {#limit} characters!"
        }),
    userLastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        "any.required": "Last name is required!",
        "string.empty": "Last name should not be empty!",
        "string.min": "Last name should have at least {#limit} characters!",
        "string.max": "Last name should have at most {#limit} characters!"
        }),
    userEmail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
        "any.required": "Email is required!",
        "string.empty": "Email should not be empty!",
        "string.email": "Please provide a valid email address!"
        }),
    userPassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .messages({
        "any.required": "Password is required!",
        "string.empty": "Password should not be empty!",
        "string.pattern.base": "Password should be between 3 and 30 characters and contain only letters and numbers!"
        })
    });

const register= async (request, response) => {
    try {
        registerSchema.validate({userFirstName: request.body.userFirstName, userLastName: request.body.userLastName, userEmail: request.body.userEmail, userPassword: request.body.userPassword})
        const hashedPassword= bcrypt.hashSync(request.body.userPassword,14);
        const existingUser= await prisma.user.findUnique({
            where: {userEmail: request.body.userEmail}
        })
        console.log(existingUser)
        if (existingUser) {
            return response.status(StatusCodes.BAD_REQUEST).json({error: "a user with this email already exists"});
        }
        const newuser= await prisma.user.create({
            data: {
                userFirstName: request.body.userFirstName,
                userLastName: request.body.userLastName,
                userEmail: request.body.userEmail,
                userPassword: hashedPassword,
    }});

        const user= {
            email: request.body.userEmail,
            name: request.body.userLastName
        }
        const token= jwt.sign(user, process.env.JWT_SECRET )

        response.status(StatusCodes.CREATED).json({
            massage: "new acount was created successfully",
            token:token
        })
    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }finally{
        await prisma.$disconnect()
    }
}

module.exports = {register};