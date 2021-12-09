let referralCodeGenerator = require("referral-code-generator");
var functionHelper = require("../helper/function-helper");
const bcrypt = require("bcrypt");

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
      referred_by:"",
      isDeleted:false
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
      await newUser.save();
      callback.msg = "New ID Created" + " " + newUser.first_name;
      callback.success = true;
      returndata(callback);
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
