const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/**
 * Product Routes
 *
 * GET    /api/products      → list all (filter, paginate)
 * POST   /api/products      → create
 * GET    /api/products/:id  → get one
 * PUT    /api/products/:id  → update
 * DELETE /api/products/:id  → delete
 */

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
