require("dotenv").config();
 let dbUser = process.env.DB_USER
 let dbPass = process.env.DB_PASS
 let dbName = process.env.DB_NAME


 
module.exports = {
   myurl: `mongodb+srv://${dbUser}:${dbPass}@moneymanagement.mox7y.mongodb.net/${dbName}?retryWrites=true&w=majority`
   
}
