import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    state: Number,
    orderitems: Number,
    updatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
