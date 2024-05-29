// importing the express module
const express = require("express");
// importing the jsonwebtoken module
const jwt = require("jsonwebtoken");

const upload = require("../middlewares/multerMiddleware.js");

// importing the getPosts and addPost function from the postController file
const { getPosts, addPost, likePost } = require("../controllers/postController.js");
// importing the verifyToken middleware function from the verifyTokenMiddleware file
const { verifyToken } = require("../middlewares/verifyTokenMiddleware.js");

// creating a new router object from the express module
const router = express.Router();

// defining a GET route for fetching posts of a specific user
router.get("/api/v1/user-posts/", verifyToken, getPosts);
// defining a POST route for adding a new post
router.post("/api/v1/create-post/", verifyToken, upload.single("file"), addPost);
// defining a POST route for liking a post
router.post("/api/v1/like-post/:postId?", verifyToken, likePost);

// exporting the router object to be used in other files
module.exports = router;