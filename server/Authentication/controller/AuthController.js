import getPrismaInstance from "../utlis/PrismaClient.js";
import bcrypt from "bcrypt"; // Use bcrypt for hashing passwords

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User Found", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const signupUser = async (req, res, next) => {
  try {
    const { email, name, username, password, profile } = req.body;

    // Validate required fields
    if (!email || !name || !username || !password) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: false });
    }

    const prisma = getPrismaInstance();

    // Check if user already exists with email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword, // Store hashed password
        profile,
      },
    });

    return res.status(201).json({
      msg: "User registered successfully",
      status: true,
      data: newUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    next(err);
  }
};
