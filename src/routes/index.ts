import express, { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/post", postRoutes);

export default router;
