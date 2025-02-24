import express from "express";
import { getSingleTherapist, getTherapists, updateTherapist } from "../controllers/therapist.controller"

const therapistRouter = express.Router();

therapistRouter.get("/", getTherapists)
therapistRouter.put("/update", updateTherapist)
therapistRouter.get("/:id", getSingleTherapist)

export default therapistRouter;