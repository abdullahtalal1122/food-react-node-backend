import Vendor from "../models/vendorModel.js";
import config from "../config/index.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newuser = new Vendor({
      email: req.body.email,
      password,
    });

    newuser.save();
    res.json({
      status: "sucess",
      massege: "Vendor Saved",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("check");
    const email = req.body.email;

    const user = await Vendor.findOne({ email });
    if (!user) return res.json({ status: "fail", massege: "Invalid username" });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return res.json({ status: "fail", massege: "Invalid Password" });

    const payload = { email: user.email, userId: user._id };
    const Token = await config.genarateToken(payload);
    res.json({
      status: "sucess",
      Token: Token,
    });
  } catch (error) {
    res.json({ ERROR: error });
  }
};

export { registerUser, loginUser };
