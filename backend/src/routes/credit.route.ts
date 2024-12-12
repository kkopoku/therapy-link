import express from "express";
import { buyCredits, submitBuyCreditOtp, getCreditPrice, checkTransactionStatus } from "../controllers/transaction.controller"

const creditRouter = express.Router();

creditRouter.post("/buy", buyCredits)
creditRouter.post("/otp", submitBuyCreditOtp)
creditRouter.post("/price", getCreditPrice)
creditRouter.get("/checkTransactionStatus/:id", checkTransactionStatus)

export default creditRouter;