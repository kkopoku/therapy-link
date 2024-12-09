import express from "express";
import { buyCredits, submitBuyCreditOtp, getCreditPrice } from "../controllers/transaction.controller"

const creditRouter = express.Router();

creditRouter.post("/buy", buyCredits)
creditRouter.post("/otp", submitBuyCreditOtp)
creditRouter.post("/price", getCreditPrice)

export default creditRouter;