import express from "express";
import { buyCredits, submitBuyCreditOtp } from "../controllers/transaction.controller"

const creditRouter = express.Router();

creditRouter.post("/buy", buyCredits)
creditRouter.post("/otp", submitBuyCreditOtp)

export default creditRouter;