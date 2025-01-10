import {Router} from "express";
import { createProduct, getProductById, getProducts } from "../controllers/ProductController.js";

const router=Router();
router.post("/product",createProduct);
router.get("/getproducts",getProducts);
router.get("/getproducts/:id",getProductById);
export default router;