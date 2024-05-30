const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient;

const followUser = async (request, response) => {
  try {
    const userEmail = request.user.email;
    const followingUserId = request.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail
      }
    });

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId: existingUser.userId,
        followingId: parseInt(followingUserId)
      }
    });

    if (existingFollow) {
      response.status(409).json({
        statusCode: 409,
        success: "Conflict",
        message: "User already followed."
      });
    }

    else {
      await prisma.follow.create({
        data: {
          followerId: existingUser.userId,
          followingId: parseInt(followingUserId)
        }
      });  
    }

    response.status(201).json({
      statusCode: 201,
      success: "OK",
      message: "User followed successfully."
    });
  }

  catch (error) {
    response.status(500).json({
      "statusCode": 500,
      "error": "Internal server error",
      "message": "An unknown error has occurred."
    });
  }
}

const unfollowUser = async (request, response) => {
  try {

  }

  catch {

  }
}

module.exports = { followUser, unfollowUser }