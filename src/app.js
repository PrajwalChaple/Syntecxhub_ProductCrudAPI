const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");

const app = express();

// ── Global Middlewares ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ── Health Check ──
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Syntecxhub Product CRUD API is running!",
  });
});

// ── API Routes ──
app.use("/api/products", productRoutes);

// ── 404 Handler — catch all unmatched routes ──
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// ── Centralized Error Handler ──
app.use(errorHandler);

module.exports = app;
