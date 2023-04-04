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
    if (isLoggedIn)
    {
      res.locals.loggedInId = req.user.id;
    }
    else
    {
      res.locals.loggedInId = 0;
    }
  
    next();
  }
};
