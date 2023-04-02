module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  setLoginStatus: function (req, res, next) {
    const isLoggedIn = req.session && req.user;
    res.locals.isLoggedIn = isLoggedIn;
    next();
  }
};
