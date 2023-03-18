const express = require("express");
const router = express.Router();
const database = require("../fake-db");

router.get("/:subName", (req, res) => {
  const subName = req.params.subName;
  const posts = database.getPosts(20, subName);
  res.render("posts/sub", {subName, posts});
});

module.exports = router;