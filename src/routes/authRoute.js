const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
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

module.exports = router;