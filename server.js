const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/dbConfig");
connectDB();

// CORS setup to allow requests from frontend

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mern-portfolio-t58u-llbqtma8d-chloe-nitcheus-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const portfolioRoute = require("./routes/portfolioRoute");

// Parse JSON bodies
app.use(express.json());

// Portfolio API route
app.use("/api/portfolio", portfolioRoute);

// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
