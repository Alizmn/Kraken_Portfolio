const express = require("express");
const router = express.Router();

const User = require("../db/Schema/userSchema");
const mongoose = require("mongoose");

/* GET users listing. */
module.exports = ({ createUser, getUserById }) => {
  router.get("/", function (req, res, next) {
    getUserById("Ali2")
      .then((result) => res.json(result))
      .catch((err) => res.status(401).send(err));

    // createUser("Ali2", "password2").then((result) => res.json(result));
  });

  return router;
};
