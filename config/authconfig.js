import config from "./index.js";
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.json({ massege: "Authorization Requied" });
  const auth = await config.verify(token);
  if (!auth) return res.json({ massege: "Token not valid " });
  next();
};

export default authenticate;
