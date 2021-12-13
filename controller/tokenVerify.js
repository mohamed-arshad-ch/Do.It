const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  var newAccessToken = {};


  try {
    if (!req.headers.refresh_token) {
      res.send("Refresh token not found").status(403).end();
    } else {
      const refreshToken = jwt.verify(
        req.headers.refresh_token,
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY
      );
      const token = req.headers.authorization.split(" ")[1];
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(
          token,
          process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
          function (err, decoded) {
            if (err) {
              return res.status(401).json({
                auth: false,
                error_code: 102,
                message: "Invalid token",
              });
            }
            newAccessToken.id = decoded.id;
            newAccessToken.username = decoded.username;
            req.decoded = decoded;
            req.body.userID = decoded.id;

            if (decoded.id === refreshToken.id) {
              accessToken = jwt.sign(
                newAccessToken,
                process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY }
              );
              next();
              return res.status(200).json({
                auth: true,
                error_code: 000,
                message: "Authentication successfull",
                access_token: accessToken,
              })
              
              
            } else {
              return res.status(401).json({
                auth: false,
                error_code: 105,
                message: "Unauthorized access found",
              });
            }
          }
        );
      } else {
        // if there is no token
        // return an error
        return res.status(403).send({
          error_code: 101,
          message: "No token provided.",
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(403).send({
      Auth: false,
      error_code: 100,
      message: "An internal error occurred",
    });
  }
};
