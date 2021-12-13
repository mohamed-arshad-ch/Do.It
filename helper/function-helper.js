var User = require("../models/user.js");
var jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
var createdAt = null;
module.exports = {
 
  //for current data and time format
  currentDate: () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let date = ("0" + currentDate.getDate()).slice(-2);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    accountCreatedDate =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    return accountCreatedDate;
  },

  addReferralPoint: async (referralUser, newUser) => {
    let referal_code_input = referralUser;
    if (referal_code_input) {
      let referee = await User.findOne({ referal_code: referal_code_input });
      if (referee) {
        const newPoint = referee.referal_points + 1;
        const updatePoint = { referal_points: newPoint };
        console.log(referee.username);
        await referee.updateOne(updatePoint);
        newUser.referal_points++;
        newUser.referred_by = referee.username;
      }
    }
    return newUser;
  },

  deleteReferralPoint: async (referralUser, newUser) => {
    let referal_code_input = referralUser;
    if (referal_code_input) {
      let referee = await User.findOne({ referal_code: referal_code_input });
      if (referee) {
        newUser.referal_points++;

        newUser.referred_by = referee.username;
        const newPoint = referee.referal_points + 1;
        const updatePoint = { referal_points: newPoint };
        console.log(updatePoint);
        await referee.updateOne(updatePoint);
      }
    }
    return newUser;
  },

  verifyToken: async (token, callback) => {
    let result = {
      status: 0,
      message: null,
      token: null,
      auth: false,
    };
    let authHeader = token;
    if (!authHeader) {
      result.status = 401;
      result.message = "unable to get token";
      callback(result);
    } else {
      let token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        function (err, decoded) {
          if (err) {
            result.status = 500;
            result.message = "Unauthorized request";
            callback(result);
          } else {
            result.status = 200;
            result.message = "Token Verified";
            console.log(decoded);
            callback(result);
          }
        }
      );
    }
  },
  deactivateAccount: async (userId, callback) => {
    let result = {
      status: 0,
      message: null,
      token: null,
      error: false,
      status_code: 0,
    };
    let user = await User.findOne({ _id: userId } && { isDeleted: false });
    if (user) {
      await user.updateOne({ isDeleted: true });
      result.status_code = 103;
      result.error = false;
      result.message = "User Deleted";
      callback(result);
    } else {
      result.status_code = 104;
      result.error = true;
      result.message = "Error Deleting User";
      callback(result);
    }
  },
  createLedger: async (data) => {
    console.log(data);
     await prisma.ledgers.create({
        data: {
          userId: data.userID,
          ledger_name: data.account_name,
          opening_balance: data.opening_balance,
          description: data.description,
          createdAt: currentDate().toString(),
        }
      });   
  }
};
