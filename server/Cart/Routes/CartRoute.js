import {Router} from "express";
import { addToCart } from "../Controller/CartController.js";

const router=Router();

router.post("/addToCart",addToCart);

export default router;