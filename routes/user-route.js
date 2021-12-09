var express = require("express");
var router = express.Router();
let referralCodeGenerator = require("referral-code-generator"); //for random referral code generation
var bcrypt = require("bcrypt"); //for hashed password
var userControl = require("../controller/user-controller");

router.get("/", function (req, res) {});
router.post("/signup", function (req, res) {
  userControl.userSignup(req.body, (returndata) => {
    if(returndata.success == true) {
      res.send("new user created" + returndata.msg)
    }else {
      res.send(returndata.msg)
    }
  });
});

router.put("/referral", function (req, res) {
res.send("this is refereal")
console.log(req.body);




});


module.exports = router;
