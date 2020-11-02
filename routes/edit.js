const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router
  .get("/", async (req, res) => {
    const user = await User.findById("5f9ee1a80a1ee5e0ab72048e");
    res.render("edit", { title: "Edit details", user: user });
  })
  .post("/", async (req, res) => {
    console.log(req.query.id);

    const user = await User.findById("5f9ee1a80a1ee5e0ab72048e");

    const { error, value } = user.validateData(req.body);
    console.log(value);
    console.log(error);
    if (error) return res.send(error.details[0].message);

    user.create(value, user.role);

    res.redirect("/");
  });

module.exports = router;
