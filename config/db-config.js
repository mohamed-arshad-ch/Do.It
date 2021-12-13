
require("dotenv").config();
let mongoUser = process.env.MONGO_DB_USER;
let mongoPass = process.env.MONGO_DB_PASS;
let mongoDb = process.env.MONGO_DB_NAME;


module.exports = {
  mongodbUrl: `mongodb+srv://${mongoUser}:${mongoPass}@moneymanagement.mox7y.mongodb.net/${mongoDb}?retryWrites=true&w=majority`,
  
};
