import express from "express";
import { registerUser, login, getUsers, updateClient, updateTherapist } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", login)
userRouter.get("/:userType", getUsers)
userRouter.patch("/updateClient", updateClient)
userRouter.patch("/updateTherapist", updateTherapist)

export default userRouter;