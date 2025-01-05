// import getPrismaInstance from "../utils/PrismaClient.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Fix the destructuring here
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    // const prisma = getPrismaInstance();
    const getUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId, 10), // Ensure the user ID is an integer if it's stored as an integer
      },
    });

    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(getUser);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Error fetching user details" });
  }
};


export const details = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;

    // Validate input
    if (!fullName || !phone || !address) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Create details for the user
    const newDetails = await prisma.details.create({
      data: { fullName, phone, address },
    });

    res.status(201).json({ success: true, data: newDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

