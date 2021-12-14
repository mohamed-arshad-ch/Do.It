var User = require("../models/user.js");
var jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

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
    await prisma.ledgers.create({
      data: {
        uid: data.userID,
        ledger_name: data.account_name,
        description: data.description,
        createdAt: Date(),
        group_name: data.group_name,
      },
    });
  },
  createTransactions: async (data) => {
    await prisma.transactions.create({
      data: {
        uid: data.userID,
        t_type: data.transaction_type,
        t_catagory: data.transaction_catagory,
        t_note: data.transaction_note,
        t_date: data.transaction_date,
        t_created_date: Date(),
        t_amount: data.transaction_amount,
        group_name: data.account_name,
      },
    });
  },
  viewAccounts: (data) => {
    return new Promise(async (resolve, reject) => {
      const getAccounts = await prisma.ledgers.findMany({
        where: {
          uid: data.userID,
        },
      });
      let accounts = [];
      for (let index = 0; index < getAccounts.length; index++) {
        accounts.push(getAccounts[index].ledger_name);
      }
      resolve(accounts);
    });
  },
  viewDailyTransactions: (data) => {
    return new Promise(async (resolve, reject) => {
      const getAccounts = await prisma.transactions.findMany({
        where: {
          uid: data.userID,
          t_date: data.dateSelected,
          t_type: data.typeSelected,
        },
      });
      console.log(getAccounts);
    });
  },
};
