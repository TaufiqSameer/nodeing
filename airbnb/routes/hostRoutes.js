const path = require("path");

const express = require("express");
const hostRoutes = express.Router();
const root = require("../utils/pathHelper");
const {
  getAddHome,
  getAdded,
  getHostHomes,
  getEditHome,
  postEditHome,
  postDeleteHome,
} = require("../Controllers/host");

hostRoutes.get("/add-home", getAddHome);
hostRoutes.get("/host-home", getHostHomes);

hostRoutes.post("/add-home", getAdded);

hostRoutes.get("/edit-home/:homeId", getEditHome);
hostRoutes.post("/edit-home", postEditHome);
hostRoutes.post("/delete-home/:homeId", postDeleteHome);

module.exports = {
  hostRoutes,
};
