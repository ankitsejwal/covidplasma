const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const home = require("./routes/home");
const donors = require("./routes/donors");
const seekers = require("./routes/seekers");
const login = require("./routes/login");

// connect database
mongoose
  .connect("mongodb://localhost/covidplasma", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to database..."))
  .catch((err) => console.error(err));

const app = express();

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

// use routes
app.use("/", home);
app.use("/donors", donors);
app.use("/seekers", seekers);
app.use("/login", login);

app.listen(process.env.PORT || 3000);
