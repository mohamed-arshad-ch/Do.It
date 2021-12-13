var express = require("express");
var router = express.Router();
let referralCodeGenerator = require("referral-code-generator"); //for random referral code generation
var userControl = require("../controller/user-controller");
var functionHelper = require("../helper/function-helper");
var isAuthorized = require("../controller/tokenVerify");

router.post("/api/auth/login", function (req, res) {
  userControl.userLogin(req.body, (callback) => {
    res.status(callback.status).send({
      Auth: callback.auth,
      access_token: callback.accessToken,
      refresh_token: callback.refreshToken,
      message: callback.message,
    });
  });
});

router.get("/",isAuthorized, function (req, res) {});
router.post("/api/signup", function (req, res) {
  userControl.userSignup(req.body, (returndata) => {
    if (returndata.success == true) {
      res.send("new user created" + returndata.msg);
    } else {
      res.send(returndata.msg);
    }
  });
});

router.post("/api/users/myaccount/dashboard/create-ledger",isAuthorized, function (req, res) {
 functionHelper.createLedger(req.body)
});

router.post("/api/users/myaccount/dashboard/create-ledger-group",isAuthorized, function (req, res) {
 functionHelper.createLedgerGroup(req.body)
});

router.put("/api/user/myaccount/delete", isAuthorized, function (req, res) {
  functionHelper.deactivateAccount(req.decoded.id, (callback) => {
    if (callback.error == true) {
      res.send(callback.message);
    } else {
      res.send(callback.message);
    }
  });
});

router.put("/api/user/myaccount/delete", isAuthorized, function (req, res) {
  functionHelper.deactivateAccount(req.decoded.id, (callback) => {
    if (callback.error == true) {
      res.send(callback.message);
    } else {
      res.send(callback.message);
    }
  });
});

router.get("api/user/dashboard", isAuthorized, function (req, res) {
  let currenToken = req.headers.authorization;
  functionHelper.verifyToken(currenToken, (callback) => {
    if (callback.auth == false) {
      res
        .status(callback.status)
        .send({ Auth: callback.auth, info: callback.message });
    } else {
      res.status(callback.status).send({
        Auth: callback.auth,
        access_token: callback.accessToken,
        refresh_token: callback.refreshToken,
      });
    }
  });
});

module.exports = router;
