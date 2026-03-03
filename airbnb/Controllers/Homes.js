const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(root,'../','airbnb','views','addHome.html'));
  res.render("admin/edit-home", {
    pageTitle: "airbnb",
    currentPage: "addHome",
    isLoggedIn : req.isLoggedIn 
  });
};

const register = [];
exports.getAdded = (req, res, next) => {
  console.log("Home registration is successfully", req.body);
  console.log(req.body.houseName);
  const h = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.urll,
  );
  h.save();
  register.push(req.body);
  // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
  res.render("admin/homeadded", {
    pageTitle: "airbnb",
    currentPage: "homeAdded",
    isLoggedIn : req.isLoggedIn 
  });
};

exports.finds = (req, res, next) => {
  const reg = Home.find((reg) =>
    res.render("store/home", { reg, pageTitle: "airbnb" }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  isLoggedIn : req.isLoggedIn 
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};
