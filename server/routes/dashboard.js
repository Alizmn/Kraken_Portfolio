const express = require("express");
const router = express.Router();

module.exports = ({ saveTransactionById }) => {
  router.get("/", (req, res, next) => {
    console.log(req.user);
    res.send("Welcome to dashboard");
  });

  router.post("/transaction", (req, res, next) => {
    const user_id = req.user.id;
    const { transactionType, fiat, crypto, date, baseFiat } = req.body;
    saveTransactionById(user_id, transactionType, fiat, crypto, date, baseFiat)
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  });

  return router;
};
