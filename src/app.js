const express = require("express");
const database = require("./fake-db");
const PORT = 8003;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const postRouter = require("./routes/postRouter");
const subRouter = require("./routes/subRouter");
app.use("/posts", postRouter);
app.use("/subs", subRouter);

app.get("/", (req, res) => {
  const posts = database.getPosts(20);
  res.render("index", { posts });
});

app.get("/debug", (req, res) => {
  db.debug();
  res.redirect("/");
});

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
