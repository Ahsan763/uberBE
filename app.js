// server.js or app.js
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const userRoutes = require("./routes/user.routes");

// Connect to database
connectToDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;