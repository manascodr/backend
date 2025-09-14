const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(
    "mongodb+srv://manas_db:Ejr0I5EHuCfskbTW@cluster0.a0qi1ww.mongodb.net/cohort"
  ).then(()=>{
    console.log('connected to DB');
    
  })
}

module.exports = connectToDB