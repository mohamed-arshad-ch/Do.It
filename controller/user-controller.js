let referralCodeGenerator = require("referral-code-generator");
var functionHelper = require("../helper/function-helper");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var User = require("../models/user.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

require("dotenv").config();

module.exports = {
  userSignup: async (signupData, returndata) => {
    //modal/user schema extended
    var newUser = new User({
      first_name: signupData.first_name,
      last_name: signupData.last_name,
      email: signupData.email,
      mobile_number: signupData.mobile_number,
      username: signupData.username,
      password: signupData.password,
      account_created_on: functionHelper.currentDate(),
      referal_code: referralCodeGenerator.custom(
        "uppercase",
        4,
        4,
        signupData.username
      ),
      referal_points: 0,
      referred_by: "",
      isDeleted: false,
    });

    let callback = {
      success: false,
      msg: "test message",
    };

    if (signupData.referal_code_input) {
      functionHelper.addReferralPoint(signupData.referal_code_input, newUser);
    }

    if (await User.findOne({ email: newUser.email })) {
      callback.msg = "Email ID Already Registered";
      callback.success = false;
      returndata(callback);
    } else if (await User.findOne({ username: newUser.username })) {
      callback.msg = "Username Already Registered";
      callback.success = false;
      returndata(callback);
    } else if (await User.findOne({ mobile_number: newUser.mobile_number })) {
      callback.msg = "Mobile number Already Registered";
      callback.success = false;
      returndata(callback);
    } else {
      // Insert the new user if they do not exist yet
      newUser.password = await bcrypt.hash(newUser.password, 10);
      let newId = await newUser.save();
      callback.msg = "New ID Created" + " " + newUser.first_name;
      callback.success = true;
      await prisma.users.create({
        data: {
          uid: newId._id.toString(),
          username: newId.username.toString(),
          createdAt: newId.account_created_on.toString(),
          active: true,
        },
      });
      returndata(callback);
    }
  },
  userLogin: async (loginData, callback) => {
    let result = {
      status: 200,
      message: null,
      accessToken: null,
      auth: false,
      refreshToken: null,
    };
    let validUser = await User.findOne({ username: loginData.username });
    if (validUser) {
      let isUserDeleted = await User.find(
        { username: loginData.username },
        { isDeleted: true }
      );
      if (isUserDeleted[0].isDeleted == false) {
        let isValidPassword = await bcrypt.compare(
          loginData.password,
          validUser.password
        );
        if (isValidPassword) {
          let data = {
            id: validUser._id,
            username: validUser.username,
          };
          result.accessToken = jwt.sign(
            data,
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY }
          );
          result.refreshToken = jwt.sign(
            data,
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRY }
          );
          result.status = 200;
          result.auth = true;
          callback(result);
        } else console.log("Incorrect Password");
      } else {
        result.message = "User deactivated";
        result.auth = false;
        callback(result);
      }
    } else {
      console.log("No User Found");
    }
  },
  userDelete: async (userData) => {},
};
