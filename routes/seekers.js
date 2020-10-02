const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("seekers");
  })
  .post("/", (req, res) => {});

module.exports = router;
