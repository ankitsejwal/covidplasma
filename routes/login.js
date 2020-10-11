const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("login");
  })
  .post("/", (req, res) => {});

module.exports = router;
