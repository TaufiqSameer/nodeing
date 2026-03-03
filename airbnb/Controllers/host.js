const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(root,'../','airbnb','views','addHome.html'));
  res.render("admin/edit-home", {
    pageTitle: "airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

const register = [];
exports.getAdded = async (req, res, next) => {
  try {
    console.log("Home registration is successful");
    console.log(req.body.houseName);
    if (!req.file) {
      console.log("no image");
      return res.redirect("/host/host-home");
    }

    console.log(req.file);
    console.log(req.file.path);
    const h = new Home({
      houseName: req.body.houseName,
      price: +req.body.price,
      description: req.body.description,
      urll: req.file.path,
      location: req.body.location,
      rating: +req.body.rating,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });

    h.save().then(() => {
      console.log("Home saved");
    });

    return res.redirect("/host/host-home");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to save home");
  }
};

exports.getHostHomes = (req, res, next) => {
  const reg = Home.find().then((row) =>
    res.render("admin/hosthomelist", {
      reg: row,
      pageTitle: "Host home airbnb",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    }),
  );
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  if (!editing) {
    return res.redirect("/host/host-home");
  }

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/host-home");
      }

      console.log(homeId, editing);

      res.render("admin/edit-home", {
        home: home,
        pageTitle: "Edit your home",
        currentPage: "addHome",
        editing: editing,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home registration is successfully", req.body);
  const { id, houseName, price, description, location, rating } = req.body;

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = +price;
      home.description = description;
      home.location = location;
      home.rating = +rating;

      if (req.file) {
        fs.unlink(home.urll, (err) => {
          if (err) {
            console.log("Cant");
          }
        });
        home.urll = req.file.path;
      }
      home
        .save()
        .then((res) => {
          console.log("Updated", res);
        })
        .catch((err) => {
          console.log(err);
        });
      // register.push(req.body);
      // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
  const homeId = req.params.homeId;
  console.log("deletning home with id : ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log(err);
    });
};
