const express = require("express");
const database = require("./fake-db");
const PORT = 8003;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const postRouter = require("./routes/postRoute");
const subRouter = require("./routes/subRoute");
app.use("/posts", postRouter);
app.use("/subs", subRouter);

app.get("/", (req, res) => {
  const posts = [];
  database.getPosts(20).forEach(post => posts.push(database.decoratePost(post)));
  res.render("index", { posts });
});

app.get("/debug", (req, res) => {
  database.debug();
  res.redirect("/");
});

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
