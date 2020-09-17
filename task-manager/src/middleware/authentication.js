const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (request, response, next) => {
  try {
    // Gets the value for the header that the user provides
    const token = request.header("Authorization").replace("Bearer ", "");
    // Validates the header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Finds the associated user
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    // Runs the route handler
    request.token = token;
    request.user = user;
    next();
  } catch (error) {
    // Runs if someone isn't authenticated
    response.status(401).send("Please authenticate.");
  }
};

module.exports = auth;
