const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login page",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};
exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign in page",
    isLoggedIn: false,
    user: {},
  });
};

exports.postSignUp = [
  check("FirstName")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Fist name not correct")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Not correct name"),
  check("LastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Not correct name"),
  check("email").isEmail().withMessage("Enter valid email").normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("8 character")
    .matches(/[A-Z]/)
    .withMessage("Should atleast one uppercase")
    .matches(/[a-z]/)
    .withMessage("lowercase")
    .matches(/[0-9]/)
    .withMessage("Enter a digit")
    .matches(/[@#$]/)
    .withMessage("Need a special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("usertype")
    .notEmpty()
    .withMessage("empty")
    .isIn(["guest", "host"])

    .withMessage("Invalid user"),
  check("terms")
    .notEmpty()
    .withMessage("Enter valid username")
    .custom((val, { req }) => {
      if (!val) {
        throw new Error("Not on");
      }
      return true;
    }),
    
  (req, res, next) => {
    const { FirstName, LastName, email, password, usertype } = req.body;
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign Up",
        isLoggedIn: false,
        errors: errors.array(),
        oldOutput: { FirstName, LastName, email, password, usertype },
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashed) => {
        const user = new User({
          FirstName,
          LastName,
          email,
          password: hashed,
          role : usertype,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Sign Up",
          isLoggedIn: false,
          errors: errors.array(),
          oldOutput: {
            FirstName,
            LastName,
            email,
            password,
            usertype,
            user: {},
          },
        });
      });
  },
];
exports.postLogin = async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  console.log("LOGIN PASSWORD:", password);
  console.log("DB PASSWORD:", user.password);
  console.log("DB PASSWORD TYPE:", typeof user.password);
  
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errors: [{ msg: "Invalid email or password" }],
      oldInput: { email },
      user: {},
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errors: [{ msg: "Invalid email or password" }],
      oldInput: { email },
          user: {},
    });
  }

  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn",true);
  // req.lsLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.clearCookie("isLoggedIn");
  // req.session.isLoggedIn = true;
  req.session.destroy(() => {
    res.redirect("/login");
  });
  // res.cookie("isLoggedIn",false);
};
