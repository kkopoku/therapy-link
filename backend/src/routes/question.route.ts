import express from "express";
import { getQuestions } from "../controllers/question.controller"

const questionRouter = express.Router()

questionRouter.get("/", getQuestions)

export default questionRouter