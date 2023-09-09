import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../env.config";
import { JWTData } from "../../types";
import ApiError from "../../errorHandler/apiError";
import UserModel, { UserInstance } from "../../models/user.model";
const { jwtSecret } = config;

const requiresSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader: string = req.headers["authorization"] || "";
    if (!authHeader) {
      return next(new ApiError(401, "No token provided"));
    }
    const token: string = authHeader.replace("Bearer ", "");

    //verify JWT
    const decoded: string | JwtPayload = jwt.verify(token, jwtSecret);

    const userId = (decoded as JWTData)._id;

    if (!userId) return next(new ApiError(403, "Invalid token provided"));

    const user = await UserModel.findOne({ where: { id: userId } });

    if (!user) return next(ApiError.badRequest("User not found"));

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default requiresSignIn;
