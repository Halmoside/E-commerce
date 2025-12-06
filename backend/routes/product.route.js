import express from "express";
import Product from "../models/product.model.js";
const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(400).json({ message: "Invalid product id" });
  }
});

export default router;
