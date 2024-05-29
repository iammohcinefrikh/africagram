const express = require("express");
const router = express.Router();
const upload = require("../helper/multerCofegeration.js");
const creatPost = require("../controllers/postController.js");

router.post("/api/v1/create-post",upload.single("file"),creatPost);

module.exports= router