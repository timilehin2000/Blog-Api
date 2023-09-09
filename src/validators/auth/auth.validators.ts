import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiError from "../../errorHandler/apiError";

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character:",
        "string.min": "Password must be at least 8 characters long",
      }),
  });

  const { error } = schema.validate(req.body, { allowUnknown: false });

  if (error) {
    return next(new ApiError(422, error.details[0].message));
  }

  next();
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { allowUnknown: false });

  if (error) {
    return next(new ApiError(422, error.details[0].message));
  }

  next();
};
