const express = require("express");
const router = express.Router();
const database = require("../fake-db");

router.get("/create", (req, res) => {
  res.render("posts/createPost");
});

router.get("/show/:postid", (req, res) => {
  const post = database.getPost(req.params.postid);
  res.render("posts/post", {post});
});

router.post("/create", (req, res) => {
  const {title, link, subgroup, description} = req.body;
  const creator = req.user.id;
  database.addPost(title, link, creator, description, subgroup);
  res.redirect("/");
});

router.post("/comment-create/:postid", (req, res) => {
  const post = database.getPost(req.params.postid);
  const creator = req.user.id;
  const {description} = req.body;
  database.addComment(post.id, creator, description);
  res.redirect(`/posts/show/${post.id}`);
});

router.get("/deleteconfirm/:postid", (req, res) => {
  const post = database.getPost(req.params.postid);
  res.render("posts/deleteconfirm", {post});  
});

router.post("/delete/:postid", (req, res) => {
  database.deletePost(req.params.postid);
  res.redirect('/');
});

router.post("/edit/:postid", (req, res) => {
  database.editPost(req.params.postid, req.body);
  res.redirect(`/posts/show/${req.params.postid}`);
})

module.exports = router;