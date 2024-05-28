const express = require("express");

const { register } = require("../controllers/authentificationController.js");

const router = express.Router();

router.post("/api/v1/register", register);
// router.post("/api/v1/login", login);

module.exports = router;