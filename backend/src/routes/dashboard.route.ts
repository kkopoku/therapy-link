import express from "express"
import { getDashboardInfo, test } from "../controllers/dashboard.controller"

const dashboardRouter = express.Router()

dashboardRouter.get("/", getDashboardInfo)
dashboardRouter.get("/test", test)

export default dashboardRouter