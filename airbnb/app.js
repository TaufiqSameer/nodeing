const path = require("path");

const express = require("express");
const app = express();
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session")(session);
const userRoutes = require("./routes/userRoutes");
const { hostRoutes } = require("./routes/hostRoutes");
const multer = require("multer");
const fs = require("fs");

const root = require("./utils/pathHelper");
const db = require("./utils/database");
const { mongoConnect } = require("./utils/mongoo");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const MONGO_DB_URL =

db.query('SELECT * FROM airbnb."Rooms"')
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.error(err);
  });
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const optmulter = {
  storage: multerstorage,
};
app.set("view engine", "ejs");
app.use(express.static(path.join(root, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(multer(optmulter).single("urll"));
app.use("/uploads", express.static(path.join(root, "uploads")));
app.use("/host/uploads", express.static(path.join(root, "uploads")));
app.use("/store/uploads", express.static(path.join(root, "uploads")));
app.use("/home/uploads", express.static(path.join(root, "uploads")));
console.log("Root " ,root );

const Store = new mongodbstore({
  uri: MONGO_DB_URL,
  collection: "sessions",
});
Store.on("error", (err) => {
  console.error("MongoDB session store error:", err);
});

app.use(
  session({
    secret: "airbnb",
    resave: false,
    saveUninitialized: false,
    store: Store,
  }),
);
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(authRoutes);

app.get("/", (req, res) => {
  res.redirect("/store/");
});

app.use("/store", userRoutes);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: req.isLoggedIn,
  });
});
const port = 8000;

// mongoConnect(() => {

// });

mongoose
  .connect(
   
  )
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(8000, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
