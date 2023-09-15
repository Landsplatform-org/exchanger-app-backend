import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = extractTokenFromHeader(req);

  if (!token)
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);

  req["user"] = payload;

  next();
};

const extractTokenFromHeader = (req: Request) => {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
};
