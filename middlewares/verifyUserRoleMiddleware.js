// import PrismaClient from the Prisma client library
const {PrismaClient} = require("@prisma/client");

// create a new instance of PrismaClient
const prisma = new PrismaClient;

// define an asynchronous function to verify the user's role
const verifyUserRole = async (request, response, next) => {
  // extract the email of the user from the request object
  const userEmail = request.user.email;

  // use Prisma client to find a unique user in the database where the email matches the user's email
  const existingUser = await prisma.user.findUnique({
    where: {
      userEmail: userEmail
    }
  });

  // check if the user is not an admin (isAdmin is 0)
  if (existingUser.isAdmin === 0) {
    // if the user is not an admin, return a 401 Unauthorized status code with an error message
    return response.status(401).json({ 
      "statusCode": 401,
      "error": "Unauthorized",
      "message": "Access is denied."
    });
  }

  // if the user is an admin, proceed to the next middleware function
  next();
}

// export the verifyUserRole function as a module
module.exports = { verifyUserRole }