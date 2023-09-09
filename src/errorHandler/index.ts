import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { errorResponse } from "../utils/responses";
import ApiError from "./apiError";
import config from "../env.config";
import { JsonWebTokenError } from "jsonwebtoken";
import { UniqueConstraintError } from "sequelize";
// import { UploadFile } from "../../types/global";

const { nodeEnv } = config;

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let message = "Oops, something went wrong. Please try again later";
  let errCode = 500;

  if (err instanceof ApiError) {
    message = err.message;
    errCode = err.code;
  } else if (err instanceof JsonWebTokenError) {
    //handle jwt errors
    message = err.message;
    errCode = 403;
  } else if (err instanceof UniqueConstraintError) {
    message = err.message;
    errCode = 400;
  } else if (
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError ||
    err instanceof TypeError ||
    err instanceof URIError
  ) {
    //handle global error types
    message = err.message;
    errCode = 400;
  }

  logger.error(
    `[${req.method} ${req.url}] ${
      typeof message === "string" ? message : JSON.stringify(message)
    }`
  );
  if (nodeEnv !== "test") console.error(err);

  errorResponse(res, errCode, message);
};

export default errorHandler;
