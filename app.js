const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const logger = require("morgan");
require("dotenv").config();

const navNiddleWare = require("./middleware/nav");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const electricRouter = require("./routes/electric");
const mountainRouter = require("./routes/mountain");
const childRouter = require("./routes/child");
const shoppingCartRouter = require("./routes/shoppingCart");
const getItems = require("./routes/apis/search_items/getItems");
const getChildItems = require("./routes/apis/search_items/getChildItems");
const getMountItems = require("./routes/apis/search_items/getMountItems");
const getElectricItems = require("./routes/apis/search_items/getElectricItems");

const app = express();

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
app.use("/getItems" ,getItems);
app.use("/getChildItems" ,getChildItems);
app.use("/getMountItems" ,getMountItems);
app.use("/getElectricItems" ,getElectricItems);

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
