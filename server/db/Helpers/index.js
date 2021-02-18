const User = require("../Schema/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = () => {
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
    getUserById,
    createUser,
  };
};
