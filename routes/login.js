const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("login", { title: "Login Page" });
  })
  .post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({ email: email });
      // if user was not found
      if (!user) {
        res.send("user not found");
      }
      // if user found then
      if (user.phone === password) {
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send(token);
        next();
      } else {
        // password didn't match
        res.send("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  });

module.exports = router;
