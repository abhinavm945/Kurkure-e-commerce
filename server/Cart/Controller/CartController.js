import getPrismaInstance from "../utils/PrismaClient.js";

export const addToCart = async (req, res) => {
  const prisma = getPrismaInstance();
  let { userId, productId } = req.body;

  // Validate userId and productId
  userId = parseInt(userId);
  productId = parseInt(productId);

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message:
        "Both fields (userId and productId) are required and should be valid.",
    });
  }

  try {
    // Find the user's cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // If the cart doesn't exist, create one
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = await prisma.cartProduct.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingCartItem) {
      return res.status(200).json({
        success: true,
        message: "Product is already in the cart.",
      });
    }

    // Add the product to the cart
    const cartProduct = await prisma.cartProduct.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });

    return res.status(201).json({
      success: true,
      data: cartProduct,
      message: "Product added to the cart successfully.",
    });
  } catch (error) {
    console.error("Error adding the product to the cart:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to the cart.",
      error: error.message,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const prisma = getPrismaInstance();

    const userId = req.params.userId; // or wherever userId comes from
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) }, // Ensure userId is an integer
      include: {
        CartProducts: {
          include: {
            Product: true, // Ensure this relation exists in `CartProduct`
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching the cart products:", error);
    res.status(500).json({ error: "Error fetching the cart products" });
  }
};
