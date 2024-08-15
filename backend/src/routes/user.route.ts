import express from "express";
import { registerUser, login } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", login)

export default userRouter;