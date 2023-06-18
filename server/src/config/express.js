import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.routes.js";
import urlRouter from "../routes/url.routes.js";
const expressApp = express();

expressApp.use(cors());
expressApp.use(morgan("dev"));
expressApp.use(express.json());
// expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cookieParser());

expressApp.use("/user", userRouter);
expressApp.use("/url", urlRouter);

export default expressApp;
