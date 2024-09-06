import express from "express"
import { getDashboardInfo } from "../controllers/dashboard.controller"

const dashboardRouter = express.Router()

dashboardRouter.get("/", getDashboardInfo)

export default dashboardRouter