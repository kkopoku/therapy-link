import express from "express";
import { getTherapists } from "../controllers/therapist.controller"

const therapistRouter = express.Router();

therapistRouter.get("/", getTherapists)

export default therapistRouter;