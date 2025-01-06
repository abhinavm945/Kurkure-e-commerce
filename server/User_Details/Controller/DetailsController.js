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

export const details = async (req, res) => {
  try {
    const prisma = getPrismaInstance();

    let { fullName, phone, address } = req.body;
    let { userId } = req.params;
    // Validate input
    if (!fullName || !phone || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Convert userId to an integer
    userId = parseInt(userId, 10);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    // Validate that the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create details for the user
    const newDetails = await prisma.details.create({
      data: { userId, fullName, phone, address },
    });

    res.status(201).json(newDetails);
  } catch (error) {
    console.error("Error creating user details:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
