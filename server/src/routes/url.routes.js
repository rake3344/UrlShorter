import { Router } from "express";
import userJWTDTO from "../dto/user-jwt.dto.js";
import {
    deleteUrl,
    getUrls,
    redirectUrl,
    shortUrl,
} from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post("/create", userJWTDTO, shortUrl);
urlRouter.get("/redirect/:code", userJWTDTO, redirectUrl);
urlRouter.get("/allUrls", userJWTDTO, getUrls);
urlRouter.delete("/delete/:urlId", userJWTDTO, deleteUrl);

export default urlRouter;
