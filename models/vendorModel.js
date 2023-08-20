import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
});

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;
