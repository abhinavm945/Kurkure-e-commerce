import getPrismaInstance from "../utils/PrismaClient.js";

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const prisma = getPrismaInstance();

    const getUser = await prisma.user.findUnique({
      where: {
        id: parsedUserId,
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

<<<<<<< HEAD
export const details = async (req, res) => {
  try {
    const prisma = getPrismaInstance();

    const { userId, fullName, phone, address } = req.body;

    // Validate input
    if (!userId || !fullName || !phone || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate that the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
=======

export const details = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;

    // Validate input
    if (!fullName || !phone || !address) {
      return res.status(400).json({ success: false, message: "Invalid input" });
>>>>>>> f5a9dd278589e923c7982075367776d85920f594
    }

    // Create details for the user
    const newDetails = await prisma.details.create({
      data: { fullName, phone, address },
    });

<<<<<<< HEAD
    res.status(201).json(newDetails);
=======
    res.status(201).json({ success: true, data: newDetails });
>>>>>>> f5a9dd278589e923c7982075367776d85920f594
  } catch (error) {
    console.error("Error creating user details:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

