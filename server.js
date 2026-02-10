const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDB = require("./config/dbConfig");
connectDB();

const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://mern-portfolio-t58u-kl24j7vb9-chloe-nitcheus-projects.vercel.app",
      "https://mern-portfolio-4-yvv0.onrender.com"
    ],
    credentials: true,
  })
);

app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
