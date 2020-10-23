const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("seekers", { title: "Get Plasma", user: new User() });
  })
  .post("/", async (req, res) => {
    const user = new User();
    user.create(req, "seeker");

    res.redirect("/seekers");
  });

module.exports = router;
