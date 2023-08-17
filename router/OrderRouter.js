import express from "express";
import {
  getOrders,
  createOrders,
  updateOrdersstate,
} from "../middlewares/orderMiddleware.js";

const orderRoute = express.Router();

orderRoute.route("/").get(getOrders).post(createOrders);

orderRoute.route("/:id").put(updateOrdersstate);

export default orderRoute;
