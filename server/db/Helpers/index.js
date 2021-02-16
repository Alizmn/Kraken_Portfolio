const User = require("../Schema/userSchema");
const mongoose = require("mongoose");

module.exports = () => {
  const getUserById = (id) => {
    return User.findOne({ _id: id });
  };
  const createUser = (username, password) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
    });
    console.log(username, password);
    return user.save();
    // .then((result) => result)
    // .catch((err) => console.log(err));
  };
  const findUser = () => {
    return null;
  };
  return {
    getUserById,
    createUser,
    findUser,
  };
};
