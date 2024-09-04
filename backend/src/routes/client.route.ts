import express from "express";
import { getClientDetails, getClients } from "../controllers/client.controller"

const clientRouter = express.Router();

clientRouter.get("/:id", getClientDetails)
clientRouter.get("/", getClients)

export default clientRouter;