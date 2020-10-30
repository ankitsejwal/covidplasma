const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  const select = req.query.select;

  let opt = {};

  if (select == "name") opt = { name: new RegExp(keyword) };
  if (select == "bloodGroup") opt = { bloodGroup: keyword.toLowerCase() };
  if (select == "locality") opt = { "address.locality": new RegExp(keyword) };

  // if search string empty
  if (!keyword) opt = {};
  const users = await User.find(opt);
  res.render("dashboard", { title: "Dashboard - CovidPlasma", users: users });
});

module.exports = router;
