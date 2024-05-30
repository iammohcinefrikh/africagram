// importing the express module
const express = require("express");
// importing the jsonwebtoken module
const jwt = require("jsonwebtoken");

// importing the followUser and unfollowUser function from the followerController file
const { followUser, unfollowUser } = require("../controllers/followerController.js");
// importing the verifyToken middleware function from the verifyTokenMiddleware file
const { verifyToken } = require("../middlewares/verifyTokenMiddleware.js");

// creating a new router object from the express module
const router = express.Router();

// defining a POST route for following a user
router.post("/api/v1/follow-user/:userId?", verifyToken, followUser);
// defining a POST route for unfollowing a user
router.post("/api/v1/unfollow-user/:userId?", verifyToken, unfollowUser);

// exporting the router object to be used in other files
module.exports = router;