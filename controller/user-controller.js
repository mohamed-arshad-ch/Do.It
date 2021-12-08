let referralCodeGenerator = require("referral-code-generator");
var functionHelper = require("../helper/function-helper");
const bcrypt = require("bcrypt");

module.exports = {
  userSignup: async (signupData, callback) => {
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
    });
    let message = {};

      //checking errors, if user already exists
    if (await User.findOne({ email: newUser.email })) {
      message = "Email ID Already Registered";
      callback(message);
    } else if (await User.findOne({ username: newUser.username })) {
      message = "Username Already Registered";
      callback(message);
    } else if (await User.findOne({ mobile_number: newUser.mobile_number })) {
      message = "Mobile number Already Registered";
      callback(message);
    } else {
      // Insert the new user if they do not exist yet
      newUser.password = await bcrypt.hash(newUser.password, 10);
      await newUser.save();
      message = "New ID Created" + " " + newUser.username;
      callback(message);
    }

    // var newUser = new User({
    //   first_name: signupData.first_name,
    //   last_name: signupData.last_name,
    //   email: signupData.email,
    //   mobile_number: signupData.mobile_number,
    //   username: signupData.username,
    //   password: signupData.password,
    //   account_created_on: functionHelper.currentDate(),
    //   referal_code: referralCodeGenerator.custom(
    //     "uppercase",
    //     4,
    //     4,
    //     signupData.username
    //   ),
    // });
    // return new Promise(async (resolve, reject) => {
    //   await User.findOne({ username: newUser.username })
    //     .then(async (profile) => {
    //       if (!profile) {
    //         bcrypt.hash(newUser.password, 10, async (err, hash) => {
    //           if (err) {
    //             console.log("Error is", err.message);
    //           } else {
    //             newUser.password = hash;
    //             await newUser
    //               .save()
    //                .then(() => {
    //                  resolve(newUser);
    //               //   res
    //               //     .status(200)
    //               //     .send(
    //               //       "New User created successfully" + " " + newUser.username
    //               //     );
    //                })
    //               .catch((err) => {
    //                 console.log("Error is ", err.message);
    //               });
    //           }
    //         });
    //       } else {
    //         console.log("User already exists...");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("Error is", err.message);
    //     });
    //   resolve(newUser);
    // });
  },
};
