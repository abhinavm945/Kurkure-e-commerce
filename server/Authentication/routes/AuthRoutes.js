import { Router } from "express";
import { checkUser, signupUser } from "../controller/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/signup", signupUser);

export default router;
