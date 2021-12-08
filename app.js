const express = require("express");
const app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./modals/user.js");
var db = require("./config/db-config.js").myurl;
var bcrypt = require("bcrypt");
require("dotenv").config();
let port = process.env.PORT;
let host = process.env.HTTP_HOST;


app.use(bodyParser.json());

var userRoute = require("./routes/user-route");

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });

app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});

module.exports = app;
