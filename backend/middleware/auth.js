import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Unauthorized: Token missing" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
