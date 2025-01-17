import express from "express";
import colors from "colors";
import cors from "cors";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import OrderRoutes from "./Routes/OrderRoutes.js";

config();

const prisma = new PrismaClient();
const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());
app.use("/order", OrderRoutes);

const connectPostGres = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log(
      `Prisma connected to the database: ${result[0].current_database}`.bgBlack
        .white
    );
  } catch (error) {
    console.error("Error connecting to database".bgRed.white, error.message);
  }
};
connectPostGres();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgGreen.black);
});
