const express = require("express");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("donors");
  })
  .post("/", async (req, res) => {
    await User.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        locality: req.body.locality,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
      },
      userType: "donor",
    });
    res.redirect("/donors");
  });

module.exports = router;
