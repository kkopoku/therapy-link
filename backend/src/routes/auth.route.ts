import express from "express";
import { 
    registerUser, 
    login,
    therapistRegister
} from "../controllers/auth.controller";
import upload from "../config/multer.config";

const authRouter = express.Router();

authRouter.post("/create", registerUser);
authRouter.post("/login", login);
authRouter.post("/therapist-apply", upload.single("file"), therapistRegister);


export default authRouter;