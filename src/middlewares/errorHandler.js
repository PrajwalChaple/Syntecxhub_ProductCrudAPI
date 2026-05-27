const ApiError = require("../utils/ApiError");

/**
 * Handle Mongoose CastError (invalid ObjectId).
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(400, message);
};

/**
 * Handle Mongoose ValidationError.
 */
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  const message = `Validation failed: ${messages.join(". ")}`;
  return new ApiError(400, message);
};

/**
 * Handle duplicate key error (code 11000).
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue).join(", ");
  const message = `Duplicate value for field(s): ${field}`;
  return new ApiError(400, message);
};

/**
 * Centralized error-handling middleware.
 * Converts known Mongoose errors into user-friendly JSON responses.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  let error = { ...err, message: err.message };

  // Mongoose-specific errors
  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);

  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  res.status(statusCode).json({
    success: false,
    status,
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
