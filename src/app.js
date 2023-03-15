const express = require("express");
const database = require("./fake-db");

const PORT = 8000;

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/debug", (req, res) => {
  db.debug();
  res.redirect("/");
});

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
