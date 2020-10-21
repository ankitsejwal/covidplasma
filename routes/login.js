const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
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
        console.log(token);
        res.header("x-auth-token", token).redirect("edit");
      } else {
        // password didn't match
        res.send("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  });

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

module.exports = router;
