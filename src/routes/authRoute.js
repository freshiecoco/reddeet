const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const database = require("../fake-db");
const { forwardAuthenticated } = require("../middleware/checkAuth");

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        res.status(500).send('Error logging out');
      } else {
        res.redirect('/');
      }
    });
  }
});

router.get('/signup', (req, res) => {
  res.render("auth/signup");
})

router.post('/signup', (req, res) => {
  if (req.body.password === req.body.passwordRepeat && req.body.uname)
  {
    console.log(req.body.uname);
    if (database.notTaken(req.body.uname))
    {
      database.addUser(req.body.uname, req.body.password);
      res.redirect("/");
    }
    else
    {
      res.redirect("/auth/signup");
    }
  }
  else
  {
    res.redirect("/auth/signup");
  }
})

module.exports = router;