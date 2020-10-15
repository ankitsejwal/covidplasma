const express = require("express");
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
        // check if the password matches
        res.send("logged in successfully");
      } else {
        // password didn't match
        res.send("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  });

module.exports = router;
