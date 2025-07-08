// src/index.ts

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes";
import gadgetRoutes from "./routes/gadget.routes";
import { authenticate } from "./middleware/auth.middleware";
import { setupSwagger } from "./utils/swagger";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

setupSwagger(app); 

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("IMF Gadget API is running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", authenticate, gadgetRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
