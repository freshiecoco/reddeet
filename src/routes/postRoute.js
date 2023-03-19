const express = require("express");
const router = express.Router();
const database = require("../fake-db");

router.get("/create", (req, res) => {
  res.render("posts/createPost");
});

router.get("/show/:postid", (req, res) => {
  let post = database.getPost(req.params.postid);
  res.render("posts/post", {post});
});

router.post("/create", (req, res) => {
  const {title, link, creator, description, subgroup} = req.body;
  database.addPost(title, link, creator, description, subgroup);
  res.redirect("/");
});

module.exports = router;