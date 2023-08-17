import express from "express";
import vendorRoute from "./router/VendorRouter.js";
import orderRoute from "./router/OrderRouter.js";

import bodyParser from "body-parser";
import config from "./config/index.js";
import cors from "cors";

const port = 8000;
const app = express();
config.db();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/vendor", vendorRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
