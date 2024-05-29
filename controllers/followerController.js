// importing the PrismaClient from the Prisma client library
const { PrismaClient } = require("@prisma/client");
// importing the handleResponse function from the handleResponseHelper file
const { handleResponse } = require("../helpers/handleResponseHelper.js");

// creating a new instance of PrismaClient
const prisma = new PrismaClient;

// defining an asynchronous function to follow a user
const followUser = async (request, response) => {
  try {
    // get the email of the user from the request object
    const userEmail = request.user.email;
    // get the userId of the user to be followed from the request parameters
    const { userId: followingUserId } = request.params;

    // check if the userId is valid
    if (!followingUserId || isNaN(parseInt(followingUserId))) {
      // if not, return a response with the status code and an error message
      return handleResponse(response, 400, "error", "Bad Request", "userId is invalid.");
    }

    // find the user in the database using their email
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    // check if the user is already following the other user
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: existingUser.userId,
        followingId: parseInt(followingUserId)
      }
    });

    // if the user is already following the other user, return a response with the status code and an error message
    if (existingFollow) {
      return handleResponse(response, 409, "error", "Conflict", "User already followed.");
    }

    // if not, create a new follow in the database
    else {
      await prisma.follow.create({
        data: {
          followerId: existingUser.userId,
          followingId: parseInt(followingUserId)
        }
      });  
    }

    // return a response with the status code and a success message
    handleResponse(response, 200, "success", "OK", "User followed successfully.");
  }

  catch (error) {
    // if an error occurs, return a response with the status code and an error message
    handleResponse(response, 500, "error", "Internal server error", "An unknown error has occurred.");
  }
}

// defining an asynchronous function to unfollow a user
const unfollowUser = async (request, response) => {
  try {
    // get the email of the user from the request object
    const userEmail = request.user.email;
    // get the userId of the user to be unfollowed from the request parameters
    const { userId: followingUserId } = request.params;

    // check if the userId is valid
    if (!followingUserId || isNaN(parseInt(followingUserId))) {
      // if not, return a response with the status code and an error message
      return handleResponse(response, 400, "error", "Bad Request", "userId is invalid.");
    }

    // find the user in the database using their email
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    // check if the user is following the other user
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: existingUser.userId,
        followingId: parseInt(followingUserId)
      }
    });

    // if the user is not following the other user, return a response with the status code and an error message
    if (!existingFollow) {
      return handleResponse(response, 404, "error", "Not Found", "Follow connection not found.")
    }

    // if the user is following the other user, delete the follow from the database
    else {
      await prisma.follow.delete({
        where: {
          followId: existingFollow.followId
        }
      });  
    }

    // return a response with the status code and a success message
    handleResponse(response, 200, "success", "OK", "Follow removed successfully.");
  }

  catch (error) {
    // if an error occurs, return a response with the status code and an error message
    handleResponse(response, 500, "error", "Internal server error", "An unknown error has occurred.");
  }
}

// exporting the followUser and unfollowUser functions to be used in other files
module.exports = { followUser, unfollowUser }