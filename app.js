const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const home = require("./routes/home");
const donors = require("./routes/donors");
const seekers = require("./routes/seekers");
const edit = require("./routes/edit");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");

// check if privatekey missing
if (!process.env.JWT_PRIVATE_KEY) {
  console.error("Private key missing ...");
  process.exit(1);
}

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
app.use("/edit", edit);
app.use("/login", login);
app.use("/dashboard", dashboard);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`app running on port ${server.address().port}`);
});
