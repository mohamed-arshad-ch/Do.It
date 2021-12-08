var express = require("express");
var router = express.Router();
let referralCodeGenerator = require("referral-code-generator");
var bcrypt = require("bcrypt");




router.get("/", function (req, res) {});
router.post("/signup", async function (req, res) {
  var newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    username: req.body.username,
    password: req.body.password,
    referal_code: referralCodeGenerator.custom(
      "uppercase",
      4,
      4,
      req.body.username
    ),
  });
  await User.findOne({ username: newUser.username })
    .then(async (profile) => {
      if (!profile) {
        bcrypt.hash(newUser.password, 10, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch((err) => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("User already exists...");
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});



module.exports = router;
