const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  const searchBy = req.query.searchBy;

  let searchOptions = {};

  if (searchBy == "name") {
    searchOptions = { name: new RegExp(keyword) };
  }
  if (searchBy == "bloodGroup") {
    searchOptions = { bloodGroup: new RegExp(keyword) };
  }
  if (searchBy == "state") {
    searchOptions = { "address.state": new RegExp(keyword) };
  }
  // if search string empty
  if (!keyword) searchOptions = {};
  const users = await User.find(searchOptions);
  res.render("dashboard", { title: "Dashboard - CovidPlasma", users: users });
});

module.exports = router;
