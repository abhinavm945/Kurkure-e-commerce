import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import colors from "colors";
import DetailsRoutes from "./Routes/DetailsRoutes.js"
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/user",DetailsRoutes)


app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`.bgGreen)
);

const connectPostGres = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log(
      `connected to the database: ${result[0].current_database}`.bgBlack
    );
  } catch (error) {
    console.error("Error connecting to database".bgRed.white, error.message);
  }
  finally {
    await prisma.$disconnect();
  }
};
connectPostGres();
