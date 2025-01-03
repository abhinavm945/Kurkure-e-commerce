//Import libraries------>>
import express from "express";
import colors from "colors";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
const app = express();
const prisma = new PrismaClient();
//ENV Configs--------->>
config();
//HTTP get request------>>
app.get("/", (req, res) => {
  res.send("Hello User Details");
});
// Database Connections ----->>

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
connectPostGres();
// Start listeining to the port----->>
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    ` User Details Server is working on PORT ${process.env.SERVER_PORT} `
    .bgWhite.black
  );
});
