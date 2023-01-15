const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const JWTStrategy = require("./strategies/jwt");

passport.use(JWTStrategy);

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.disable("x-powered-by");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authArouter = require("./routes/auth");
const postsRouter = require("./routes/posts");

app.use("/", indexRouter);
app.use("/auth", authArouter);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
app.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsRouter
);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(err.statusCode).send({ errors: err.errors });
  }
});

module.exports = app;
