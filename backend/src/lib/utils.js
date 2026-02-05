import jwt from "jsonwebtoken";

export const generateToken = async (userId, response) => {
  // sign takes three things
  /* 1. payload
     2. secret key
     3. options    */
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  response.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milli seconds
    httpOnly: true, // This prevents XSS from client side javascript attacks.
    sameSite: "strict", // This prevents CSRF attacks.
    secure: process.env.NODE_ENV === "development" ? false : true, // This prevents XSS from client side javascript attacks.
  });

  return token;
};
