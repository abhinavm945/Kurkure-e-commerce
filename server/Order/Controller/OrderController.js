import getPrismaInstance from "../utils/PrismaClient.js";

/**
 * Push a new order to the database.
 */
export const pushOrder = async (req, res) => {
  try {
    const prisma = getPrismaInstance();
    const { userId, payment, price, cartId } = req.body;

    if (!userId || !payment || !price || !cartId) {
      return res.status(400).json({
        success: false,
        message: "All fields (userId, payment, price, cartId) are required.",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        products: { // Relation name based on your schema
          include: {
            product: true, // Includes product details from CartProduct
          },
        },
      },
    });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        payment,
        price,
        cartId,
      },
      include: {
        cart: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    // Clear the cart after creating the order
    await prisma.cartProduct.deleteMany({ where: { cartId } });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in pushOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

/**
 * Fetch orders for a specific user.
 */
export const getOrder = async (req, res) => {
  try {
    const prisma = getPrismaInstance();
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        cart: {
          include: {
            products: { include: { product: true } },
          },
        },
      },
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user." });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      payment: order.payment,
      price: order.price,
      products: order.cart.products.map((cartProduct) => ({
        productId: cartProduct.product.id,
        name: cartProduct.product.name,
        price: cartProduct.product.price,
        quantity: cartProduct.quantity,
      })),
    }));

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully.",
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error in getOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
