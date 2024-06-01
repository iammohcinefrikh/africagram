// import PrismaClient from the Prisma client library
const {PrismaClient} = require("@prisma/client");

// create a new instance of PrismaClient
const prisma = new PrismaClient;

// importing the handleResponse function from the handleResponseHelper file
const { handleResponse } = require("../helpers/handleResponseHelper.js");

// define an asynchronous function to get statistics
const getStatistics = async (request, response) => {
  try {
    // use Prisma client to count the number of users in the database
    const userCount = await prisma.user.count();

    // use Prisma client to count the number of posts in the database
    const postCount = await prisma.post.count();

    // use Prisma client to count the number of comments in the database
    const commentCount = await prisma.comment.count();

    // use Prisma client to find the first post in the database ordered by the number of likes in descending order
    const mostLikedPost = await prisma.post.findFirst({
      orderBy: {
          postLikes: "desc",
      },
    });

    // send a 200 OK status code with the statistics as a JSON object
    response.status(200).json({
      "statusCode": 200,
      "success": "OK",
      "userCount": userCount,
      "postCount": postCount,
      "commentCount": commentCount,
      "mostLikedPost": mostLikedPost
    });
  }

  // catch any errors that occur during the execution of the try block
  catch (error) {
    // send a 500 Internal Server Error status code with an error message as a JSON object
    handleResponse(response, 500, "error", "Internal server error", "An unknown error has occurred.");
  }
}

// export the getStatistics function as a module
module.exports = { getStatistics }