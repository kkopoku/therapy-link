import express from "express"
import { handleCallbacks } from "../controllers/paystack.controller"

const paystackRouter = express.Router()

paystackRouter.post("/", handleCallbacks)

export default paystackRouter