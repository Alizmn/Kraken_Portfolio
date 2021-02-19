const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../Schema/userSchema");
const Transaction = require("../Schema/transactionSchema");

module.exports = () => {
  const saveTransactionById = (
    user_id,
    transactionType,
    fiat,
    crypto,
    date,
    baseFiat = null
  ) => {
    const transaction = new Transaction({
      _id: new mongoose.Types.ObjectId(),
      user_id,
      transactionType,
      fiat,
      crypto,
      date,
      baseFiat,
    });
    return transaction.save();
  };

  const getUserById = (id) => {
    return User.findOne({ _id: id });
  };

  const createUser = (name, username, phone, password) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      username,
      phone,
      password,
    });
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      user.password = hash;
    });
    return user.save();
  };

  const findUserbyEmail = () => {
    return null;
  };
  return {
    saveTransactionById,
    getUserById,
    createUser,
  };
};
