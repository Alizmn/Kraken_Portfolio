const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// -------------------------SCHEMA-------------------------
const User = require("../db/Schema/userSchema");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // Match email
          if (!user) {
            return done(null, false, {
              message: "Incorrect Email Or Password",
            });
          }
          // Match password
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Incorrect Email Or Password",
                });
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          throw error;
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
