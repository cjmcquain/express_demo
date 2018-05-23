const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("./logger");
const courses = require("./courses");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

app.use(logger);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

app.use(function(req, res, next) {
  console.log("Authenticating...");
  next();
});

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
