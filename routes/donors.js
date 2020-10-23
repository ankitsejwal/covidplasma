const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("donors", { title: "Donate Plasma", user: new User() });
  })
  .post("/", async (req, res) => {
    await User.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      email: req.body.email,
      phone: await generateHashedPassword(req.body.phone),
      address: {
        locality: req.body.locality,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
      },
      role: "donor",
    });

    res.redirect("/donors");
  });

async function generateHashedPassword(password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

module.exports = router;
