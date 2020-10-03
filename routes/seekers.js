const express = require("express");
const { type } = require("os");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("seekers");
  })
  .post("/", (req, res) => {});

module.exports = router;
