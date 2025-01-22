import getPrismaInstance from "../utils/PrismaClient.js";

export const createProduct = async (req, res) => {
    const prisma = getPrismaInstance();
    const { name, description, price, stock, image, categories } = req.body;

    if (!name || !description || !price || !stock || !categories) {
        return res.status(400).json({
            success: false,
            message: "All fields are required, including categories.",
        });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Categories must be a non-empty array.",
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
                categories, // Array of strings
            },
        });

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProducts = async (req, res) => {
    const prisma = getPrismaInstance();
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

export const getProductById = async (req, res) => {
    const prisma = getPrismaInstance();
    const { id } = req.params;

    try {
        const productById = await prisma.product.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (!productById) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: productById,
        });
    } catch (error) {
        console.error("Error fetching product detail:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};
