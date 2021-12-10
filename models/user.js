var mongoose = require("mongoose"),
  validators = require("mongoose-validators");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    validate: validators.isAlpha(),
  },
  password: {
    type: String,
    require: true,
  },
  first_name: {
    type: String,
    require: true,
    validate: validators.isAlpha(),
  },
  last_name: {
    type: String,
    require: true,
    validate: validators.isAlpha(),
  },
  email: {
    type: String,
    require: true,
    validate: validators.isEmail(),
  },
  mobile_number: {
    type: String,
    require: true,
    validate: validators.isNumeric(),
  },
  referal_code: {
    type: String,
    require: true,
  },
  account_created_on: {
    type: String,
    require: true,
    validate: validators.isDate(),
  },
  referal_points: {
    type: Number,
    require: true,
  },
  referred_by: {
    type: String,
    require: false,
  },
    isDeleted : {
      type: Boolean,
      require: false
  },

 },{ versionKey: '2.0.0' 

});

const User = mongoose.model("Users", UserSchema);

module.exports = User;