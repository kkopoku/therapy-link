import express from "express";
import { registerUser, login, getUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", login)
userRouter.get("/:userType", getUsers)

export default userRouter;