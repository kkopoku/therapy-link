import express from "express";
import { getClientDetails } from "../controllers/client.controller"

const clientRouter = express.Router();

clientRouter.get("/:id", getClientDetails)

export default clientRouter;