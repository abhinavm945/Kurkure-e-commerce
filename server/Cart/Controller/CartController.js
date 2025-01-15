import getPrismaInstance from "../utils/PrismaClient.js";

export const addToCart=async(req,res)=>{
const prisma =getPrismaInstance();
let {userId,productId}=req.body;
userId = parseInt(userId);
productId = parseInt(productId);
if(!userId || !productId){
    return res.status(400).json({
        success:false,
        message:"Both feilds are required.",
    })
}

try {
    let cart=await prisma.cart.findUnique({
        where:{
            userId,
        }
    })

    if(!cart){
        cart=await prisma.cart.create({
            data:{
                userId,
            }
        });
    }

    const existingCartItem=await prisma.cartProduct.findFirst({
        where:{
            cartId: cart.id,
            productId,
        },
    });

    if(existingCartItem){
        return res.status(200).json({
            success:true,
            message:"Product is already in the Cart.",
        });
    }

    const cartProduct=await prisma.cartProduct.create({
        data:{
            cartId: cart.id,
            productId,
            quantity:1,
        },
    });
    res.status(201).json({ success: true, data: cartProduct });
} catch (error) {
    console.log("Error adding the Product to CArt:", error);
    res.status(500).json({
        success:false,
        message:"Failed to add product to the cart.",
        error: error.message,
    });
}
};

export const getCartProducts=async(req,res)=>{
    const prisma=getPrismaInstance();
    const {userId}=req.params;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:"User Id is required.",
        });
    }
    try {
        const cart=await prisma.cart.findUnique({
            where: {userId: parseInt(userId)},
            include: {
                products: {
                    include:{
                        product:true,
                    },
                },
            },
        });
        if(!cart){
            return res.status(400).json({
                success:false,
                message:"Cart not found.",
            });
        }
   const cartProducts = cart.products.map((cartProduct) => ({
      productId: cartProduct.productId,
      quantity: cartProduct.quantity,
      product: cartProduct.product,
    }));
    return res.status(200).json({
        success: true,
        data: cartProducts,
      });
    } catch (error) {
        console.error("Error fetching the cart products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the cart products.",
      error: error.message,
    });
    }

} 