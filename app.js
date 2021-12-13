const express = require("express");
const app = express();
var mongoose = require("mongoose");

var bodyParser = require("body-parser");
var mongoDb = require("./config/db-config.js").mongodbUrl;

var bcrypt = require("bcrypt");
var cors = require("cors");
require("dotenv").config();
let port = process.env.PORT;
let host = process.env.HTTP_HOST;


//for body parsing json format
app.use(bodyParser.json());

app.use(cors());
//routes defined
var userRoute = require("./routes/user-route");



//database connection stats
mongoose
  .connect(mongoDb)
  .then(() => {
    console.log("MongoDB Conenction established");
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
