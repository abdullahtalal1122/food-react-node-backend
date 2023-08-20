import express from "express";
import { registerUser, loginUser } from "../middlewares/customerMiddleware.js";
import { oAuthgoogle } from "../middlewares/customerMiddleware.js";

const vendorRoute = express.Router();

vendorRoute.route("/register").post(registerUser);
vendorRoute.route("/login").post(loginUser);
vendorRoute.route("/oauth/google").post(oAuthgoogle);

export default vendorRoute;
