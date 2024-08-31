import express from "express"

import { createSession } from "../controllers/session.controller"

const sessionRouter = express.Router();

sessionRouter.post("/create", createSession)

export default sessionRouter;