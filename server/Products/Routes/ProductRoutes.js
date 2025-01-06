import {Router} from "express";
import { createProduct } from "../controllers/ProductController.js";

const router=Router();
router.post("/product",createProduct);
export default router;