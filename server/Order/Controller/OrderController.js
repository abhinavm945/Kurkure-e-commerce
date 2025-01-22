import getPrismaInstance from "../utils/PrismaClient.js";

/**
 * Push a new order to the database.
 */
export const pushOrder = async (req, res) => {
  try {
    const prisma = getPrismaInstance();
    const { userId, payment, price, cartId } = req.body;

    // Validate input
    if (!userId || !payment || !price || !cartId) {
      return res.status(400).json({
        success: false,
        message: "All fields (userId, payment, price, cartId) are required.",
      });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the cart exists and contains products
    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
      include: {
        CartProducts: { // Ensure this matches the schema
          include: {
            Product: true,
          },
        },
      },
    });

    if (!cart || cart.CartProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty or does not exist.",
      });
    }

    // Check if an order already exists for the given cartId
    const existingOrder = await prisma.order.findUnique({
      where: { cartId: parseInt(cartId) },
      include: { OrderProduct: true },
    });

    if (existingOrder) {
      // Append new products to the existing order
      const newProducts = cart.CartProducts.map((cartProduct) => ({
        userId: parseInt(userId),
        productId: cartProduct.productId,
        name: cartProduct.Product.name,
        description: cartProduct.Product.description,
        price: cartProduct.Product.price,
        categories: cartProduct.Product.categories,
        quantity: cartProduct.quantity,
        orderId: existingOrder.id,
      }));

      await prisma.orderProduct.createMany({ data: newProducts });

      return res.status(200).json({
        success: true,
        message: "Order updated with new products.",
        data: existingOrder,
      });
    }

    // Create a new order
    const newOrder = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        payment,
        price: parseFloat(price),
        cartId: parseInt(cartId),
        OrderProduct: {
          create: cart.CartProducts.map((cartProduct) => ({
            userId: parseInt(userId),
            productId: cartProduct.productId,
            name: cartProduct.Product.name,
            description: cartProduct.Product.description,
            price: cartProduct.Product.price,
            categories: cartProduct.Product.categories,
            quantity: cartProduct.quantity,
          })),
        },
      },
      include: { OrderProduct: true },
    });

    // Clear the cart after creating the order
    await prisma.cartProduct.deleteMany({
      where: { cartId: parseInt(cartId) },
    });

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
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        OrderProduct: true,
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      payment: order.payment,
      price: order.price,
      products: order.OrderProduct.map((orderProduct) => ({
        productId: orderProduct.productId,
        name: orderProduct.name,
        description: orderProduct.description,
        price: orderProduct.price,
        categories: orderProduct.categories,
        quantity: orderProduct.quantity,
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
