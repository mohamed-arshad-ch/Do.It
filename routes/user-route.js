var express = require("express");
var router = express.Router();
let referralCodeGenerator = require("referral-code-generator");
var bcrypt = require("bcrypt");
var userControl = require("../controller/user-controller");


router.get("/", function (req, res) {});
router.post("/signup", function (req, res) {

  userControl.userSignup(req.body,(message) => {
      res.send(message);
  });
    
});



module.exports = router;
