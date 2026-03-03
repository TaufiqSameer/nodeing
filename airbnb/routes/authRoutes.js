const express = require("express");
const { getLogin, postLogin, postLogout, getSignUp, postSignUp } = require("../Controllers/auth");

const authRoutes = express.Router();

authRoutes.get("/login", getLogin);
authRoutes.post("/login", postLogin);
authRoutes.post("/logout", postLogout);
authRoutes.get("/sign-up",getSignUp);
authRoutes.post("/sign-up", postSignUp);

module.exports = authRoutes;

