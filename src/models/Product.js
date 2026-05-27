const mongoose = require("mongoose");

/**
 * Product Schema
 * Fields: name, price, description, category
 * Timestamps are auto-generated (createdAt, updatedAt).
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      lowercase: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Index on category & price for efficient filtering queries
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);
