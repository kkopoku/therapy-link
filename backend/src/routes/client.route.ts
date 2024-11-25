import express from "express";
import { getClientDetails, getClients, getCredits } from "../controllers/client.controller"

const clientRouter = express.Router();

clientRouter.get("/:id", getClientDetails)
clientRouter.get("/", getClients)
clientRouter.get("/credits", getCredits)

export default clientRouter;