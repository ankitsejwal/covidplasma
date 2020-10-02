const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const donors = require("./routes/donors");
const seekers = require("./routes/seekers");

const app = express();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

// use routes
app.use("/donors", donors);
app.use("/seekers", seekers);

app.listen(process.env.PORT || 3000);
