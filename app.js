require("dotenv").config();
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let app = express();
let session = require("express-session");
let db = require("./config/db.config");

db.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected to database");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000,
    },
  })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.get("/", (req, res) => {
//   res.send("<h1>HELLO WORLD</h1>");
// });

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

// app.listen(process.env)

module.exports = app;
