const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const {SECRET} = require("../config/env");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  // Skip token verification for login and signup routes
  // explanation below
  if (req.path === "/user/login" || req.path === "/user/signup") {
    return next();
  }

  if (token) {
    try {
      const { _id } = jwt.verify(token, SECRET);
      const user = await User.findOne({ _id }).select("_id");

      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error verifying token:", error.message);
      res.clearCookie("jwt"); // Clear invalid or expired token
      res.redirect("/user/login");
    }
  } else {
    res.redirect("/user/login");
  }
};

module.exports = verifyToken;


// When you make a request to `/user/login`, the middleware is still active and will be executed unless you explicitly skip it as yit has been done with the condition:

// ```javascript
// if (req.path === "/user/login" || req.path === "/user/signup") {
//     return next();
// }
// ```

// With this condition in place, the middleware will skip token verification for requests to `/user/login` and `/user/signup`, allowing those routes to be accessed without requiring a valid token.

// So, when a request is made to `/user/login`, the middleware will check the path and see that it matches `/user/login`, and it will then skip the token verification and call `next()`, allowing the request to proceed to the `getLoginPage` or `postLogin` handler in your `userRouter`.

// This ensures that your login and signup routes are accessible without requiring authentication, while other routes protected by this middleware will still require a valid token.