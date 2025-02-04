import express from "express";
import { 
    registerUser, 
    login,
    registrationInitiate
} from "../controllers/auth.controller";
import upload from "../config/multer.config";

const authRouter = express.Router();

authRouter.post("/create", registerUser);
authRouter.post("/login", login);
authRouter.post("/registrationInitiate", upload.single("file"), registrationInitiate);


export default authRouter;