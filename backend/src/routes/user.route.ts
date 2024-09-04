import express from "express";
import { 
    getUsers, 
    updateClient, 
    updateTherapist, 
    getUser, 
    getClients
} from "../controllers/user.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/getAllUsers", adminAuth, getUsers)


userRouter.patch("/updateClient", updateClient)
userRouter.patch("/updateTherapist", updateTherapist)
userRouter.get("/:id", getUser)

export default userRouter;