const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res, next) => {
    console.log("Ali");
    res.send("Welcome to dashboard");
  });
  return router;
};
