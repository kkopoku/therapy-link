import express from "express";
import { getTherapists, updateTherapist } from "../controllers/therapist.controller"

const therapistRouter = express.Router();

therapistRouter.get("/", getTherapists)
therapistRouter.put("/update", updateTherapist)

export default therapistRouter;