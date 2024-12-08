import express from "express";
import { getClientDetails, getClients, getCredits } from "../controllers/client.controller"

const clientRouter = express.Router();

clientRouter.get("/credits", getCredits)
clientRouter.get("/:id", getClientDetails)
clientRouter.get("/", getClients)

export default clientRouter;