import Vendor from "../models/vendorModel.js";
import config from "../config/index.js";
import bcrypt from "bcrypt";

import { OAuth2Client } from "google-auth-library";

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

const oAuthgoogle = async (req, res) => {
  try {
    const { authorizationCode } = req.body;

    const googleUser = await verifyGoogleIdToken(authorizationCode);

    const user = await Vendor.findOne({ googleId: googleUser.sub });

    if (!user) {
      user = new Vendor({
        googleId: googleUser.sub,
        email: googleUser.email,
      });
      await user.save();
    }

    const payload = { email: googleUser.email, userId: googleUser.sub };
    const Token = await config.genarateToken(payload);
    res.json({
      status: "sucess",
      Token: Token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }

  async function verifyGoogleIdToken(idToken) {
    try {
      const client = new OAuth2Client(
        "138090815002-r5j12j1f5okmum3bg1e8k7t8biropi83.apps.googleusercontent.com"
      );
      const ticket = await client.verifyIdToken({
        idToken,
        audience:
          "138090815002-r5j12j1f5okmum3bg1e8k7t8biropi83.apps.googleusercontent.com",
      });

      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw error;
    }
  }
};

export { registerUser, loginUser, oAuthgoogle };
