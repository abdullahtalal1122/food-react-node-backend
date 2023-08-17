import Order from "../models/orderModel.js";
import { verify } from "../config/jwtfunction.js";
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "updatedBy",
      select: "email",
    });

    res.json({ status: "success", orders });
  } catch (error) {}
};

const createOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await verify(token);

    const neworder = new Order({
      state: "0",
      orderitems: req.body.orderItems,
      updatedBy: [decodedToken.userId],
    });

    neworder.save();
    res.json({ status: "sucess", massege: "Order is saved" });
  } catch (error) {
    console.log(error);
  }
};

const updateOrdersstate = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newState = req.params.state;
    const token = req.headers.authorization;
    const decodedToken = await verify(token);

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $set: { state: newState },
        $push: { updatedBy: decodedToken.userId },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({ error: "Order not found" });
    }

    res.json({ status: "success", order: updatedOrder });
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

export { getOrders, createOrders, updateOrdersstate };
