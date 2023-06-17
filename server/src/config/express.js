import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const expressApp = express();

expressApp.use(cors());
expressApp.use(morgan("dev"));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cookieParser());

export default expressApp;
