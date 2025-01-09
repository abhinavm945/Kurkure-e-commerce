import getPrismaInstance from "../utils/PrismaClient.js"

export const createProduct = async (req, res) => {
    const prisma = getPrismaInstance();
  const { name, description, price, stock, image } = req.body;

  // Validate required fields
  if (!name || !description || !price || !stock) {
      return res.status(400).json({
          success: false,
          message: "All fields are required.",
      });
  }

  try {
      const newProduct = await prisma.product.create({
          data: {
              name,
              description,
              price: parseFloat(price),
              stock: parseInt(stock, 10),
              image,
          },
      });
      res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ success: false, message: error.message });
  }
}



export const getProducts= async (req,res)=>{
    const prisma = getPrismaInstance();
    try {
        const products=await prisma.product.findMany();
        res.status(200).json({success:true, data:products})
    } catch (error) {
        console.log("Not able to fetch the Products from the database : ",error);
        res.status(500).json({success:false , messsage:"Failed to fetch the Products"});
    }
}