const express = require("express");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("donors", { title: "Donate Plasma", user: new User() });
  })
  .post("/", async (req, res) => {
    const user = new User();

    const { value, error } = user.validateData(req.body);

    console.log(value);
    console.log(error);

    if (error) return res.send(error.details[0].message);
    user.create(value, "donor");
    res.redirect("/donors");
  });

module.exports = router;
