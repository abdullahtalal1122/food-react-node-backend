import express from "express";
import { registerUser, loginUser } from "../middlewares/customerMiddleware.js";

const vendorRoute = express.Router();

vendorRoute.route("/register").post(registerUser);
vendorRoute.route("/login").post(loginUser);

export default vendorRoute;
