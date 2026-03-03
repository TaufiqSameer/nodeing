const mongoose = require("mongoose");

const User = mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "First name is required"],
  },
  LastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true   
  },
  password: {
    type: String,
    required: [true, "pASSWROD IS REQUIRED"],
  },
  role: {
    type: String,
    enum: ["guest", "host"],
  },
  favourites  : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }]
});
module.exports = mongoose.model("User", User);
