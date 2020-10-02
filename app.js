const express = require("express");
const donors = require("./routes/donors");
const seekers = require("./routes/seekers");

const app = express();

// use routes
app.use("/donors", donors);
app.use("/seekers", seekers);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT || 3000);
