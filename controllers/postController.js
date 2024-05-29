// import PrismaClient from the Prisma client library
const {PrismaClient} = require("@prisma/client");

// create a new instance of PrismaClient
const prisma = new PrismaClient;

// define an asynchronous function to get posts
const getPosts = async (request, response) => {
  try {
    // get the email of the user from the request object
    const userEmail = request.user.email;

    // find the user in the database using their email
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    // find all posts by the user in the database
    const existingUserPosts = await prisma.post.findMany({
      where: {
        userId: existingUser.userId
      }
    });

    // send a response with the status code and the posts
    response.status(200).json({
      statusCode: 200,
      success: "OK",
      message: "Posts fetched successfully.",
      posts: existingUserPosts
    });
  }

  catch (error) {
    // send a response with the status code and the error message
    response.status(500).json({
      "statusCode": 500,
      "error": "Internal server error",
      "message": "An unknown error has occurred."
    });
  }
}

// define an asynchronous function to add a post
const addPost = async (request, response) => {
  try {
    // get the post image and caption from the request body
    const { postCaption } = request.body;
    // get the email of the user from the request object
    const userEmail = request.user.email;

    const postImage = request.file.path.replace("/\\/g, '/'");

    console.log(postImage);

    // find the user in the database using their email
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    // create a new post in the database
    await prisma.post.create({
      data: {
        postImage: postImage,
        postCaption: postCaption,
        userId: existingUser.userId
      }
    });

    // send a response with the status code and a success message
    response.status(201).json({
      statusCode: 201,
      success: "OK",
      message: "Post added successfully."
    });
  }

  catch (error) {
    // send a response with the status code and the error message
    response.status(500).json({
      "statusCode": 500,
      "error": "Internal server error",
      "message": "An unknown error has occurred."
    });
  }
}

// This is an asynchronous function to like a post
const likePost = async (request, response) => {
  try {
    // Extracting postId from request parameters
    const { postId } = request.params;
    
    // Extracting user email from the request user object
    const userEmail = request.user.email;

    // Finding the user in the database using the userEmail
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    // Finding the post in the database using the postId
    const existingPost = await prisma.post.findUnique({
      where: {
        postId: parseInt(postId)
      }
    });

    // Updating the post in the database to increment the postLikes by 1
    await prisma.post.update({
      where: {
        postId: parseInt(postId)
      },
      data: {
        postLikes: parseInt(existingPost.postLikes) + 1
      }
    });

    // Creating a new like in the database with the userId and postId
    await prisma.like.create({
      data: {
        userId: existingUser.userId,
        postId: existingPost.postId
      }
    });

    // Sending a success response with status code 201 and a success message
    response.status(201).json({
      statusCode: 201,
      success: "OK",
      message: "Post liked successfully."
    });
  }

  // Catch block to handle any errors that occur during the execution of the try block
  catch (error) {
    // Sending an error response with status code 500 and an error message
    response.status(500).json({
      "statusCode": 500,
      "error": "Internal server error",
      "message": "An unknown error has occurred."
    });
  }
}

// export the getPosts and addPost functions
module.exports = { getPosts, addPost, likePost }