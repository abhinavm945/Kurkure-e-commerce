//Import libraries------>>
const express = require("express");
const colors = require("colors");
const app = express();
//ENV Configs--------->>
require("dotenv").config();
//HTTP get request------>>
app.get("/", (req, res) => {
  res.send("Hello payment gateway");
});
// Start listeining to the port----->>
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    ` Payment Gateway Server is working on PORT ${process.env.SERVER_PORT} `
      .bgWhite.black
  );
});
