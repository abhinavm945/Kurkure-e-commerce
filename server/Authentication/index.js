import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

const postgresConnection = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log("Connected to database: ".bgBlue, result[0]);
  } catch (e) {
    console.error("Error connecting to database:".bgRed, e);
  } finally {
    await prisma.$disconnect();
  }
};
postgresConnection();