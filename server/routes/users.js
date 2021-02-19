const express = require("express");
const router = express.Router();

const User = require("../db/Schema/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
/*          ^------- Look at auth in config, it is to ensure user is logged in
                                   ^------ it ensures user in NOT logged in
*/
module.exports = () => {
  // ----------------------------------------REGISTER HANDLE--------------
  router.post("/register", forwardAuthenticated, (req, res, next) => {
    const { name, username, phone, email, password, rePassword } = req.body;
    // Check that all fields are provided + phone is not required
    if (!name || !username || !email || !password || !rePassword) {
      res.json({ error: "Please Provide All required Field" });
      // check for password criteria
    } else if (password !== rePassword || password.length < 6) {
      password.length < 6
        ? res.json({ error: "Password must be at least 6 characters" })
        : res.json({ error: "Password fields don't match" });
    } else {
      // email and username should be unique through the application
      User.findOne({ email })
        .then((user) => {
          if (user) {
            res.json({ error: "User already exist" });
          } else {
            User.findOne({ username })
              .then((user) => {
                if (user) {
                  res.json({ error: "Username already exist" });
                } else {
                  const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    username,
                    email,
                    phone,
                    password,
                  });
                  // hash the password
                  bcrypt.hash(newUser.password, 10, (err, hash) => {
                    if (err) {
                      throw err;
                    }
                    newUser.password = hash;
                    newUser
                      .save()
                      .then((result) => {
                        // --------------------WHAT HAPPENS AFTER REGISTERATION------------
                        passport.authenticate("local", {
                          successRedirect: "/dashboard",
                          failureRedirect: "/user/login",
                        })(req, res, next);
                      })
                      .catch((error) => {
                        throw error;
                      });
                  });
                }
              })
              .catch((error) => {
                throw error;
              });
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  });

  // ----------------------------------------LOGIN HANDLE-----------------
  router.post("/login", forwardAuthenticated, (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/user/login",
    })(req, res, next);
  });

  // ----------------------------------------LOGOUT HANDLE-----------------
  router.post("/logout", ensureAuthenticated, (req, res, next) => {
    req.logout();
    res.send("Successfully logged out");
  });

  return router;
};
