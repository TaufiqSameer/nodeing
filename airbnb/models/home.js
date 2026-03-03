const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const home = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  urll: String,
  location: { type: String, required: true },
  rating: { type: Number, required: true },
});

/*
this.houseName = houseName;
this.price = price;
this.description = description;
this.urll = urll;
this.location = location;
this.rating = rating;

save()
find()
deleteById()


*/
// home.pre('findOneAndDelete', async function() {
//   const homeId = this.getQuery()["_id"];
//   await Favourite.deleteMany({homeId : homeId});
// })
module.exports = mongoose.model("Home", home);
