import express from "express";
import { 
    registerUser, 
    login, 
    getUsers, 
    updateClient, 
    updateTherapist, 
    getUser 
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", login)
userRouter.get("/getAllUsers/:userType", getUsers)
userRouter.patch("/updateClient", updateClient)
userRouter.patch("/updateTherapist", updateTherapist)
userRouter.get("/:id", getUser)

export default userRouter;