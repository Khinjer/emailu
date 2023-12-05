require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("./models/User");
require("./services/passport");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");

mongoose
  .connect(process.env.MONGO_URI)
  .then((mng) => console.log("connected to mongodb database..."))
  .catch((reason) => console.log("connection to database failed..."));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRouter);

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


