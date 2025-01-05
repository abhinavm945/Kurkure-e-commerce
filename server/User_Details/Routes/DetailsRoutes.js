import { Router } from "express";
import { getUserDetails,details } from "../Controller/DetailsController.js";

const router = Router();

router.get("/user-details/:userId", getUserDetails);
router.post("/post-details/:userId",details)

export default router;
