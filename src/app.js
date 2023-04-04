const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const database = require("./fake-db");
const PORT = 8003;

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("passport");
const postRouter = require("./routes/postRoute");
const subRouter = require("./routes/subRoute");
const authRouter = require("./routes/authRoute");
const { setLoginStatus } = require("./middleware/checkAuth");

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(setLoginStatus);

app.get("/", (req, res) => {
  const posts = [];
  database.getPosts(20).forEach(post => posts.push(database.decoratePost(post)));
  res.render("index", { posts });
});

app.get("/debug", (req, res) => {
  database.debug();
  res.redirect("/");
});

app.use("/posts", postRouter);
app.use("/subs", subRouter);
app.use("/auth", authRouter);

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);

