var mongoose = require('mongoose'), validators = require('mongoose-validators');;

const UserSchema = mongoose.Schema({
   username:{
     type:String,
     require:true
   },
   password:{
     type:String,
     require:true
   },
   first_name:{
     type:String,
     require:true
   },
   last_name:{
     type:String,
     require:true
   },
   email:{
     type:String,
     require:true,
     validate: validators.isEmail()
   },
   mobile_number:{
     type:String,
     require:true,
     validate: validators.isNumeric()
   },
   referal_code:{
     type:String,
     require:true
   },
   account_created_on:{
     type:String,
     require:true,
     validate: validators.isDate()
   }
   
});
module.exports = User = mongoose.model('Users',UserSchema);