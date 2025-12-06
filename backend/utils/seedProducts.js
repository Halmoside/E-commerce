/**
 * Run: npm run seed
 * This script creates sample products if none exist.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Product from "../models/product.model.js";
import { connectDB } from "../config/db.js";

async function main() {
  await connectDB(process.env.MONGO_URI);
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log("Products already seeded");
    process.exit(0);
  }
  const sample = [
    { name: "Classic Sneakers", price: 1999, description: "Comfortable everyday sneakers", image: "https://picsum.photos/seed/s1/600" },
    { name: "Running Shoes", price: 2999, description: "Lightweight running shoes", image: "https://picsum.photos/seed/s2/600/400" },
    { name: "Formal Shoes", price: 2599, description: "Sleek leather formal shoes", image: "https://picsum.photos/seed/s3/600/400" },
    { name: "Casual Loafers", price: 1499, description: "Easy slip-on loafers", image: "https://picsum.photos/seed/s4/600/400" }
  ];
  await Product.insertMany(sample);
  console.log("Seeded products");
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
