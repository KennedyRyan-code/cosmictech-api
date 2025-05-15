const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");

const blogRoute = require("./routes/blogs");
const collabRoute = require("./routes/collaborate");
const joinUsRoute = require("./routes/joinUs");
const testRoute = require("./routes/test");

dotenv.config();
const app = express();

// cors middleware
// Allow requests from specific origins
const allowedOrigins = [
  "https://realcosmic.tech",
  "https://www.realcosmic.tech",
];
if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:5173");
}
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/test", testRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/collaborate", collabRoute);
app.use("/api/joinUs", joinUsRoute);

// Connect to MongoDB
// Connect to MongoDB only once (check if already connected)
let isConnected = false;
async function connectToDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectToDB();

// Vercel Serverless Function
module.exports = serverless(app);

//  local development
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
