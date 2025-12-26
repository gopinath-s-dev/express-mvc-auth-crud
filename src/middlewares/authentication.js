import jwt from "jsonwebtoken";
import Utils from "../utils/commonFunctions.js";

const tokenAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    const token = authHeader.split(" ")[1];
    if (!token) throw Utils.apiError("Token required", 400);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

export { tokenAuthentication };
