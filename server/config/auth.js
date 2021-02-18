// ---------------------------PROTECTING ROUTES----------------
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send("Please log in first ..."); // <-------- this line would run if user is NOT logged in
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.send("Wow, you are already in ..."); // <-------- this line would run if user is logged in
  },
};
