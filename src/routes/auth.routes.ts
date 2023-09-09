import express, { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../validators/auth/auth.validators";
import { authController } from "../di/controllerLoccator";

const authRouter: Router = express.Router();

authRouter.post("/signup", signupValidation, authController.signup);
authRouter.post("/login", loginValidation, authController.login);

export default authRouter;
