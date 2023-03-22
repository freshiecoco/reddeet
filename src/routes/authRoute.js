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

module.exports = router;