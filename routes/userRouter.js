const express = require("express");
const { verifyToken } = require("../middlewares/verifyTokenMiddleware.js");
const editUser= require("../controllers/userController.js");


const router = express.Router();


router.put("/api/v1/update-user/",verifyToken,editUser);

module.exports = router