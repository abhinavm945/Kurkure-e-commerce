import express from "express";
import colors from "colors";
import {PrismaClient} from "@prisma/client";
import {config} from "dotenv";
import cors from "cors";
import CartRoute from "./Routes/CartRoute.js";

config();

const prisma =new PrismaClient();
const app=express();
const PORT= process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/cart",CartRoute);

const connectPostGres=async()=>{
    try {
        const result=await prisma.$queryRaw`SELECT current_database()`;
        console.log(`Prisma connected to the database: ${result[0].current_database}`.bgBlack.bgWhite.white);
    } catch (error) {
        console.error("Error connecting to database".bgRed.white, error.message);
    }
}
connectPostGres();

app.listen(PORT,()=>{
    console.log(`Server is Running on the ${PORT}`.bgGreen.white);
})