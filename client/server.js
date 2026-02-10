const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/dbConfig");
connectDB();

const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
const path = require("path");

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
