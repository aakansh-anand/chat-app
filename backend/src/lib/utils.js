import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = async (userId, response) => {
  // sign takes three things
  /* 1. payload
     2. secret key
     3. options    */
  const { JWT_SECRET, NODE_ENV, JWT_EXPIRES_IN } = ENV;
  if (!JWT_SECRET) throw new Error("JWT Secret is not configured.");
  const token = jwt.sign({ userId: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || "15d",
  });

  response.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milli seconds
    httpOnly: true, // This prevents XSS from client side javascript attacks.
    sameSite: "strict", // This prevents CSRF attacks.
    secure: NODE_ENV === "development" ? false : true, // This prevents XSS from client side javascript attacks.
  });

  return token;
};
