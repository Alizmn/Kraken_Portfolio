const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./config/auth");

require("./config/passport")(passport);

// --------------------------DATABASE-----------------------
const db = require("./db");
const dbHelpers = require("./db/Helpers/index")();

// --------------------------ROUTER-----------------------
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");

const app = express();

app.use(logger("dev"));

// --------------------------PARSER-----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --------------------------SESSION-----------------------
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
// --------------------------PASSPORT-----------------------
app.use(passport.initialize());
app.use(passport.session());

// --------------------------ROUTES-----------------------
app.use("/", indexRouter);
app.use("/users", usersRouter({ ...dbHelpers }));
app.use("/dashboard", ensureAuthenticated, dashboardRouter({ ...dbHelpers }));

module.exports = app;
