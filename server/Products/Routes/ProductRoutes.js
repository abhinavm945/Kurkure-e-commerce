import {Router} from "express";
import { createProduct, getProducts } from "../controllers/ProductController.js";

const router=Router();
router.post("/product",createProduct);
router.get("/getproducts",getProducts);
export default router;