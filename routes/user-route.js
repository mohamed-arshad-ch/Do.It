var express = require("express");
var router = express.Router();
let referralCodeGenerator = require("referral-code-generator"); //for random referral code generation
var userControl = require("../controller/user-controller");
var functionHelper = require("../helper/function-helper");
router.get("/", function (req, res) {});
router.post("/signup", function (req, res) {
  userControl.userSignup(req.body, (returndata) => {
    if (returndata.success == true) {
      res.send("new user created" + returndata.msg);
    } else {
      res.send(returndata.msg);
    }
  });
});

router.put("/referral", function (req, res) {
  res.send("this is refereal");
  console.log(req.body);
});

router.post("/auth/login", function (req, res) {
  userControl.userLogin(req.body, (callback) => {
    res
      .status(callback.status)
      .send({
        Auth: callback.auth,
        access_token: callback.accessToken,
        refresh_token: callback.refreshToken,
        message: callback.message,
      });
  });
});

router.get("/user/dashboard", function (req, res) {
  let currenToken = req.headers.authorization;
  functionHelper.verifyToken(currenToken, (callback) => {
    if (callback.auth == false) {
      res
        .status(callback.status)
        .send({ Auth: callback.auth, info: callback.message });
    } else {
      res
        .status(callback.status)
        .send({
          Auth: callback.auth,
          access_token: callback.accessToken,
          refresh_token: callback.refreshToken,
        });
    }
  });
});

module.exports = router;
