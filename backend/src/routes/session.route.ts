import express from "express"

import { createSession, getSessions, getSessionDetails } from "../controllers/session.controller"

const sessionRouter = express.Router();

sessionRouter.post("/create", createSession)
sessionRouter.get("/", getSessions)
sessionRouter.get("/:id", getSessionDetails)


export default sessionRouter;