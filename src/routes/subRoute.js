const express = require("express");
const router = express.Router();
const database = require("../fake-db");

router.get("/show/:subName", (req, res) => {
  const subName = req.params.subName;
  const posts = [];
  database.getPosts(20, subName).forEach(post => posts.push(database.decoratePost(post)));
  res.render("subs/sub", {subName, posts});
});

router.get("/list", (req, res) => {
  const subList = database.getSubs();
  res.render("subs/list", {subList});
});

module.exports = router;