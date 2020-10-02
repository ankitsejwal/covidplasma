const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("donors");
  })
  .post("/", (req, res) => {});

module.exports = router;
