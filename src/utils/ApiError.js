/**
 * Custom API Error class.
 * Extends native Error with an HTTP status code for centralized handling.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // distinguishes expected errors from bugs

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
