const express = require("express")
const { verifyToken } = require("../middlewares/verifyTokenMiddleware.js");
const newcomment= require("../controllers/commentController.js")


const router = express.Router()

router.post("/api/v1/add-comment/:postId?",verifyToken,newcomment)

module.exports= router