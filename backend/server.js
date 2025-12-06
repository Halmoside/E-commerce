import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productsRouter from "./routes/product.route.js";
import usersRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
  ));
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  app.use("/api/products", productsRouter);
  app.use("/api/users", usersRouter);

  app.get("/", (req, res) => res.send("MERN E-Commerce API"));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});

