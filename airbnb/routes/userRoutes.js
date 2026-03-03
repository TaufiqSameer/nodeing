const path = require("path");
const root = require("../utils/pathHelper");

const express = require("express");
const {
  register,
  finds,
  getBookings,
  getFavouriteList,
  getIndex,
  findDetails,
  addFavouriteList,
  postRemoveFromFavourite,
} = require("../Controllers/store");
const { registerHooks } = require("module");
const userRoutes = express.Router();

userRoutes.get("/", getIndex);
userRoutes.get("/home", finds);
userRoutes.get("/bookings", getBookings);
userRoutes.get("/Favourite", getFavouriteList);

userRoutes.get("/home/:homeId", findDetails);

userRoutes.post("/Favourite", addFavouriteList);
userRoutes.post("/Favourite/delete/:homeId", postRemoveFromFavourite);

module.exports = userRoutes;
