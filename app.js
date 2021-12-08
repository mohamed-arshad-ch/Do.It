const express = require("express");
const app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./modals/user.js");
var db = require("./config/db-config.js").myurl;
var bcrypt = require("bcrypt");
require("dotenv").config();

app.use(bodyParser.json());

let port = process.env.PORT;
let host = process.env.HTTP_HOST;

var userRoute = require("./routes/user-route");

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });



app.use('/', userRoute);

// app.get("/", function (req, res) {
//   res.send("Hello World!");
//   res.status(200)
// });


app.post("/login", async (req, res) => {
   var newUser = {};
  newUser.username = req.body.username;
  newUser.password = req.body.password;

  await User.findOne({ name: newUser.username })
    .then(profile => {
      if (!profile) {
        res.send("User not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              res.send("User authenticated");
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

//  app.post("/posturl",function(req,res,next){
//      console.log(req.body);
//      res.send("response");
//  });

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});

module.exports = app;
