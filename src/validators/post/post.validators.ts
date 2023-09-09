import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiError from "../../errorHandler/apiError";

export const addPostValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { allowUnknown: false });

  if (error) {
    return next(new ApiError(422, error.details[0].message));
  }

  next();
};

export const editPostValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body, { allowUnknown: false });

  if (error) {
    return next(new ApiError(422, error.details[0].message));
  }

  next();
};
