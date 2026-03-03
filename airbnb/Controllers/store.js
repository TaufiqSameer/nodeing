const Home = require("../models/home");
const user = require("../models/user");

exports.finds = (req, res, next) => {
  const reg = Home.find().then((row) =>
    res.render("store/home", {
      reg: row,
      pageTitle: "airbnb",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};
exports.getIndex = (req, res, next) => {
  console.log("Session:", req.session);
  const reg = Home.find().then((row) =>
    res.render("store", {
      reg: row,
      pageTitle: "airbnb",
      currentPage: "Index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    }),
  );
};

// res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));

exports.getBookings = (req, res, next) => {
  const reg = Home.find().then((row) =>
    res.render("store/bookings", {
      reg: row,
      pageTitle: "Bookings",
      currentPage: "bookings",
      user: req.session.user,
    }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  isLoggedIn: req.isLoggedIn;
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};
exports.getFavouriteList = async (req, res, next) => {
  const usId = req.session.user._id;
  const User = await user.findById(usId).populate("favourites");
  res.render("store/Favourite", {
    fil: User.favourites,
    pageTitle: "My favourites",
    currentPage: "FAVOURITE",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.addFavouriteList = async (req, res, next) => {
  const homeId = req.body.id;
  const userid = req.session.user._id;
  const User = await user.findById(userid);
  if (!User.favourites.includes(homeId)) {
    User.favourites.push(homeId);
    await User.save();
  }
  res.redirect("/store/Favourite");
};
// console.log(homeId);
// Favourite.findOne({ homeId: homeId })
//   .then((fav) => {
//     if (fav) {
//       console.log("Already favourite");
//       res.redirect("/store/Favourite");
//     } else {
//       fav = new Favourite({ homeId: homeId });
//       fav.save().then((res) => {
//         console.log("favadded");
//       });
//       res.redirect("/store/Favourite");
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// console.log(homeId);
// const fav = new Favourite(homeId);
// fav
//   .save()
//   .then((result) => {
//     console.log("Fav added: ", result);
//   })
//   .catch((err) => {
//     console.log("Error while marking favourite: ", err);
//   })
//   .finally(() => {
//     res.redirect("/store/Favourite");
//   });

exports.postRemoveFromFavourite = async (req, res, next) => {
  const userid = req.session.user._id;
  const User = await user.findById(userid);

  const homeId = req.params.homeId;
  if (User.favourites.includes(homeId)) {
    User.favourites = User.favourites.filter((fav) => fav != homeId);
    await User.save();
  }
  res.redirect("/store/Favourite");
  // console.log(homeId);
  // Favourite.deleteOne({ homeId: homeId })
  //   .then((res) => {
  //     if (!res) {
  //       console.log("Canont delete", res.message);
  //     } else {
  //       console.log("Deleted");
  //     }
  //     res.redirect("/store/Favourite");
  //   })
  //   .catch((err) => {
  //     console.log("Unsuccessfully attempt to delete", err.message);
  //     res.redirect("/store/Favourite");
  //   });
};

exports.findDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/home");
    } else console.log("Found", home);
    res.render("store/home-details", {
      home: home,
      pageTitle: "Home detail",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
