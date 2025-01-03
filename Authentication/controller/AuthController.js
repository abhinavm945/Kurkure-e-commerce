import getPrismaInstance from "../utlis/PrismaClient.js";

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
    const { email, username, password, profile } = req.body;

    if (!email || !username || !password) {
      return res.json({ msg: "All fields are required", status: false });
    }

    const prisma = getPrismaInstance();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.json({ msg: "User already exists", status: false });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password, // Hash the password before storing in production
        profile,
      },
    });

    return res.json({
      msg: "User registered successfully",
      status: true,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};
