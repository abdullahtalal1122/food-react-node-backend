import Jwt from "jsonwebtoken";
import config from "./index.js";
const genarateToken = async (payload) => {
  try {
    const token = await Jwt.sign(payload, config.secretKey, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
const verify = async (token) => {
  try {
    return await Jwt.verify(token, config.secretKey);
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
export { genarateToken, verify };
