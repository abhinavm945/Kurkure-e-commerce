import express from "express";
import colors from "colors";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import cors from "cors";

config();

const prisma = new PrismaClient();
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const connectPostGres = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log(
      `connected to the database: ${result[0].current_database}`.bgBlue.black
    );
  } catch (error) {
    console.error("Error connecting to database".bgRed.white, error.message);
  }
};



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgGreen.bgBlack);
    connectPostGres();
});
