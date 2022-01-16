const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
// require("./db/conn");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));

//   process.env.PORT || 5000

// routes
// app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// cookies

// app.get("/set-cookies", (req, res) => {
//     // res.setHeader("set-Cookie", "newUser = true");

//     res.cookie("isTarun", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//     res.send("I got The cookies!");
// });

// app.get("/read-cookies", (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);

//     res.json(cookies);
// });
