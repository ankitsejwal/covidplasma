const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router
  .get("/", async (req, res) => {
    const user = await User.findById(req.query.id);
    console.log(user);

    res.render("edit", { title: "Edit details", user: user });
  })
  .post("/", async (req, res) => {
    console.log(req.query.id);
    await User.findByIdAndUpdate(req.query.id, {
      $set: {
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
      },
    });
  });

module.exports = router;
