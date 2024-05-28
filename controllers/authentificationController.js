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

// define a Joi schema for login validation
const loginSchema = Joi.object({
    // define validation for userEmail
    userEmail: Joi.string() // userEmail should be a string
    .email() // userEmail should be a valid email
    .required() // userEmail is required
    .messages({ // custom error messages
      "string.empty": "Email cannot be empty", // error message when userEmail is empty
      "string.email": "Please enter a valid email", // error message when userEmail is not a valid email
      "any.required": "Email is required" // error message when userEmail is not provided
    }),

    // define validation for userPassword
    userPassword: Joi.string() // userPassword should be a string
    .min(8) // userPassword should have a minimum length of 8
    .required() // userPassword is required
    .messages({ // custom error messages
      "string.empty": "Password cannot be empty", // error message when userPassword is empty
      "string.min": "Password should have a minimum length of 8", // error message when userPassword is less than 8 characters
      "any.required": "Password is required" // error message when userPassword is not provided
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


// define the login function
const login = async (request, response) => {
    try {
        // destructure userEmail and userPassword from the request body
        const { userEmail, userPassword } = request.body;

        // validate the request body against the loginSchema
        const { error } = loginSchema.validate({ userEmail: userEmail, userPassword: userPassword });

        // if validation fails, return a 400 status code with the validation error message
        if (error) {
            return response.status(400).json({
                "statusCode": 400,
                "error": "Bad Request",
                "message": error.details[0].message
            });
        }

        // try to find a user in the database with the provided userEmail
        const existingUser = await prisma.user.findUnique({
            where: {
                userEmail: userEmail
            }
        });

        // if no user is found, return a 401 status code with an error message
        if (!existingUser) {
            return response.status(401).json({
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Access is denied due to invalid credentials."
            });
        }

        else {
            // compare the provided password with the stored password
            const matchingPassword = await bcrypt.compare(userPassword, existingUser.userPassword);
            
            // if the passwords do not match, return a 401 status code with an error message
            if (!matchingPassword) {
                return response.status(401).json({
                    "statusCode": 401,
                    "error": "Unauthorized",
                    "message": "Access is denied due to invalid credentials."
                });
            }

            else {
                // if the passwords match, sign a JWT with the user's email and return it in the response
                const jwtToken = jwt.sign({ email: userEmail }, process.env.JWT_SECRET);
                response.status(200).json({ jwtToken });
            }
        }
    }

    // if any error occurs during the execution of the above code, return a 500 status code with an error message
    catch (error) {
        response.status(500).json({
            "statusCode": 500,
            "error": "Internal server error",
            "message": "An unknown error has occurred."
        });
    }
}

module.exports = {register, login};