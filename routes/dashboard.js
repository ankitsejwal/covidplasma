const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  let searchOptions = {
    name: new RegExp(req.query.search),
  };

  // if search string empty
  if (!req.query.search) searchOptions = {};

  const users = await User.find(searchOptions);
  res.render("dashboard", { title: "Dashboard - CovidPlasma", users: users });
});

module.exports = router;
