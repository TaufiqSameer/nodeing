const mongoose = require("mongoose");

const Favourite = mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    requried: true,
    unique: true,
  },
});

module.exports = mongoose.model('Favourite',Favourite);
 