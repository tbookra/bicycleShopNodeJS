const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const navNiddleWare = require("./middleware/nav");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const electricRouter = require("./routes/electric");
const mountainRouter = require("./routes/mountain");
const childRouter = require("./routes/child");
const shoppingCartRouter = require("./routes/shoppingCart");
const ordersRouter = require("./routes/orders");
const getCategoryItems = require("./routes/apis/get_items/getCategoryItems");
const adminRouter = require("./routes/admin");

const app = express();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MONGO");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to MONGO", err);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "i2u374y5340987", resave: false, saveUninitialized: true })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(navNiddleWare);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/electric", electricRouter);
app.use("/mountain", mountainRouter);
app.use("/child", childRouter);
app.use("/shoppingCart", shoppingCartRouter);
app.use("/orders", ordersRouter);
app.use("/getCategoryItems", getCategoryItems);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
