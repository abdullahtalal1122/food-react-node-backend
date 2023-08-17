import db from "./dbconfig.js";
import { genarateToken, verify } from "./jwtfunction.js";
import authenticate from "./authconfig.js";
const URL = "mongodb://127.0.0.1:27017/dbFood";
const secretKey = "ThisIsMySecretKey";

const config = {
  URL,
  db,
  secretKey,
  genarateToken,
  authenticate,
  verify,
};

export default config;
