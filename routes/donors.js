const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("donors");
  })
  .post("/", (req, res) => {});

module.exports = router;
