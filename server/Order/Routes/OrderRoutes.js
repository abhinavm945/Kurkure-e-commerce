import { Router } from "express";

import { pushOrder, getOrder } from "../Controller/OrderController.js";

const router = Router();

router.post("/pushOrder", pushOrder);
router.get("/getOrder/:userId", getOrder);

export default router;
