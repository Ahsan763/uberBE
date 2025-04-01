const mongoose = require("mongoose")

function connectToDB() {
  mongoose.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true /* can remove these both */
    }
  ).then(() => {
    console.log("connected to DB")
  }).catch(err => console.log());
}

module.exports = connectToDB