import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/user.model";
import { IUserRepository } from "../repository/user.repository";
import ApiError from "../errorHandler/apiError";
import { successResponse } from "../utils/responses";
import { checkValidity, createAccessToken } from "../utils/helpers/auth";

class AuthController {
  userRepository: IUserRepository<UserInstance>;

  constructor(userRepository: IUserRepository<UserInstance>) {
    this.userRepository = userRepository;
  }

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await this.userRepository.findAll({
        where: {
          email,
        },
      });

      if (user.length > 0)
        return next(new ApiError(422, "User with email already exists"));

      await this.userRepository.create({
        email,
        password,
        firstName,
        lastName,
      } as UserInstance);

      return successResponse(res, 201, "User signup successful", {
        email,
        firstName,
        lastName,
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user: UserInstance | null = await this.userRepository.findOne({
        attributes: ["id", "email", "password"],
        where: {
          email,
        },
      });

      if (user === null) return next(new ApiError(422, "User not found"));

      if (!checkValidity(password, user.password))
        return next(new ApiError(401, "Invalid email or password"));

      const accessToken = createAccessToken(user.id);
      return successResponse(res, 200, "User login successful", {
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default AuthController;
