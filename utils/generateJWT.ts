import jwt, { Secret } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user: any) => {
  const plainUser = JSON.parse(JSON.stringify(user))

  const accessToken = jwt.sign(
    plainUser,
    process.env.ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: "3d",
    }
  );

  return accessToken
}

export const generateRefreshToken = (user: any) => {
  const plainUser = JSON.parse(JSON.stringify(user))

  const refreshToken = jwt.sign(
    plainUser,
    process.env.REFRESH_TOKEN_SECRET as Secret, {
      expiresIn: "7d",
    }
  );

  return refreshToken
}