const express = require("express");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("donors", { title: "Donate Plasma", user: new User() });
  })
  .post("/", async (req, res) => {
    const user = new User();
    console.log("post");

    const { error } = user.validateData(req.body);

    if (error) return res.send(error.details[0].message);

    user.create(req, "donor");
    res.redirect("/donors");
  });

module.exports = router;
