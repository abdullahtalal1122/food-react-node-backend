import config from "./index.js";
import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(config.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

export default db;
