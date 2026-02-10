const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDB = require("./config/dbConfig");
connectDB();

const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());

// ✅ CORS FIX (allow Vercel + localhost)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-portfolio-t58u-r4k54ear6-chloe-nitcheus-projects.vercel.app",
      "https://mern-portfolio-t58u-llbqtma8d-chloe-nitcheus-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
