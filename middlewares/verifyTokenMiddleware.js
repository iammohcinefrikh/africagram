// import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// define a function to verify the JWT token
const verifyToken = (request, response, next) => {
  // get the JWT token from the request headers
  const jwtToken = request.headers["authorization"];
  
  // if there is no JWT token in the request headers, return an error
  if (!jwtToken) {
    return response.status(401).json({
      "statusCode": 401,
      "error": "Unauthorized",
      "message": "Token not found."
    });
  }

  // verify the JWT token
  jwt.verify(jwtToken, process.env.JWT_SECRET, (error, decoded) => {
    // if there is an error in verification, return an error
    if (error) {
      return response.status(401).json({ 
        "statusCode": 401,
        "error": "Unauthorized",
        "message": "Access is denied."
      });
    }

    // if the token is verified successfully, add the decoded information to the request object
    request.user = decoded;
    // proceed to the next middleware function
    next();
  });
};

// export the verifyToken function
module.exports = { verifyToken }