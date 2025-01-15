import {Router} from "express";
import { addToCart, getCartProducts } from "../Controller/CartController.js";

const router=Router();

router.post("/addToCart",addToCart);
router.get('/getcart/:userId',getCartProducts);

export default router;