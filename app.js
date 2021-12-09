const express = require("express");
const app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user.js");
var db = require("./config/db-config.js").myurl;
var bcrypt = require("bcrypt");
require("dotenv").config();
let port = process.env.PORT;
let host = process.env.HTTP_HOST;

//for body parsing json format
app.use(bodyParser.json());

//routes defined
var userRoute = require("./routes/user-route");

//database connection stats
mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });

//route added
app.use("/", userRoute);

//server defined
app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

module.exports = app;
