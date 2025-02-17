import express from "express"
import { verifyOTP } from "../controllers/otp.controller"

const otpRouter = express.Router()

otpRouter.get("/verify", verifyOTP)

export default otpRouter