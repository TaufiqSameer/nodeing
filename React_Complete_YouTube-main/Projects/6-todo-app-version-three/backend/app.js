const path = require("path");

const express = require("express");
const app = express();
const cors = require("cors");
const root = require("./util/pathHelper");
const { mongoConnect } = require("./util/mongoo");
const { default: mongoose } = require("mongoose");
const todoItemRouter = require("./routes/todoItemsRoutes");
const bodyParser = require("body-parser");

const MONGO_DB_URL =
  "mongodb+srv://sameertanker_db_user:26314@todo-list.zjck8af.mongodb.net/";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(root, "public")));
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemRouter);
app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

const port = 8000;

// mongoConnect(() => {

// });

mongoose
  .connect(
    "mongodb+srv://sameertanker_db_user:26314@todo-list.zjck8af.mongodb.net/",
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
