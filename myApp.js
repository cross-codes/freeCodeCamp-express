require("dotenv").config();
const bodyParser = require("body-parser");
let express = require("express");
let app = express();

console.log("Hello World");

const absolutePath = __dirname + "/views/index.html";
const publicPath = __dirname + "/public";

app.use("/*", bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(publicPath));

app.get("/public", function(req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") res.json({ message: "HELLO JSON" });
  else res.json({ message: "Hello json" });
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word });
});

app.route("/name").get(function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}` });
}).post(function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
