import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./connect.js";

const app = express();
const PORT = 8001;


import { router as urlRoute } from "./routes/url.js";
import {router as qrCodeRoute} from "./routes/qrcode.routes.js"
import { router as userRoute } from "./routes/user.js";
import {router as analyticsRoute} from "./routes/analytics.routes.js"
import { userInfo } from "os";
import cors from "cors";
import dotenv from "dotenv";
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error occoured during connecting to mongoDB"));
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",urlRoute)
app.use("/user", userRoute);
app.use("/qrcode",qrCodeRoute);
app.use("/analytics",analyticsRoute)
app.get("/test", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    urls: allURLs,
  });
});
app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`));
