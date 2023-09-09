import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    status: false,
    error: "lol, and Just Like That, You Completely Lost Your Way",
    reqUrl: req.originalUrl,
  });
};

export default notFound;
