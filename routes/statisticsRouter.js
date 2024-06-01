// import the express library
const express = require("express");

// import the verifyToken middleware function from the verifyTokenMiddleware module
const { verifyToken } = require("../middlewares/verifyTokenMiddleware.js");

// import the verifyUserRole middleware function from the verifyUserRoleMiddleware module
const { verifyUserRole } = require("../middlewares/verifyUserRoleMiddleware.js");

// import the getStatistics function from the statisticsController module
const { getStatistics } = require("../controllers/statisticsController.js");

// create a new router object
const router = express.Router();

// define a GET route for "/api/v1/get-stats" that first verifies the token, then verifies the user role, and finally calls the getStatistics function
router.get("/api/v1/get-stats", verifyToken, verifyUserRole, getStatistics);

// export the router object as a module
module.exports = router;