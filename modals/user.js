var mongoose = require('mongoose');

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
     require:true
   },
   mobile_number:{
     type:String,
     require:true
   },
   referal_code:{
     type:String,
     require:true
   }
   
});
module.exports = User = mongoose.model('Users',UserSchema);