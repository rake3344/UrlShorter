import { Router } from "express";
import userRegisterDTO from "../dto/user-register.dto.js";
import userLoginDTO from "../dto/user-login.dto.js";
import {
    getUsers,
    userLogin,
    userRegister,
} from "../controllers/user-controller.js";
import userJWTDTO from "../dto/user-jwt.dto.js";

const userRouter = Router();

userRouter.post("/register", userRegisterDTO, userRegister);
userRouter.post("/login", userLoginDTO, userLogin);
userRouter.get("/users", userJWTDTO, getUsers);

export default userRouter;
