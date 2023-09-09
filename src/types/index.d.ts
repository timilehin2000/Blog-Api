import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/user.model";

export interface JWTData extends JwtPayload {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserInstance;
    }
  }
}

// export type SearchParams = {
//   title?: string;
//   category?: string;
// };
