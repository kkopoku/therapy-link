import express from "express";
import { getClientDetails, getClients, getCredits, updateClient } from "../controllers/client.controller"

const clientRouter = express.Router();

clientRouter.get("/credits", getCredits)
clientRouter.get("/:id", getClientDetails)
clientRouter.get("/", getClients)
clientRouter.put("/update", updateClient)

export default clientRouter;