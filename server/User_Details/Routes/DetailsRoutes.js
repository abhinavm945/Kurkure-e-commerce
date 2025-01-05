import { Router } from "express";
import { getUserDetails,details } from "../Controller/DetailsController.js";

const router = Router();

router.post("/post-details",details);
router.get("/user-details/:userId", getUserDetails);

export default router;
