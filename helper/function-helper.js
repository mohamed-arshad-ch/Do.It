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

  addReferralPoint: async (referralUser,newUser) => {

       let referal_code_input = referralUser;
    if (referal_code_input) {
      let referee = await User.findOne({ referal_code: referal_code_input });
      if (referee) {
        const newPoint = referee.referal_points + 1
        const updatePoint = {referal_points :newPoint }
        console.log(updatePoint);
        await referee.updateOne(updatePoint)
        newUser.referal_points++;
      }
    }
    return newUser;
  }
};
