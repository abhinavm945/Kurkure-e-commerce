import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Fix the destructuring here
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

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
console.log(prisma.profile);
export const details = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const { userId } = req.params;

    // Ensure userId is an integer
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    // Create a new user profile
    const postDetails = await prisma.profile.create({
      data: {
        userId: parsedUserId,
        fullName,
        phone,
        address,
        user,
      },
    });

    return res.status(200).json(postDetails);
  } catch (error) {
    console.error("Error posting user details:", error);
    return res.status(500).json({ message: "Error posting user details" });
  }
};
