const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/dbConfig");

// Allow requests from your local frontend
app.use(cors({
  origin: "http://localhost:3000",  // React dev server
  credentials: true
}));

app.use(express.json());

app.use("/api/portfolio", require("./routes/portfolioRoute"));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
