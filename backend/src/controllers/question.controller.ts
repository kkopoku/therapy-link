import Question from "../models/question.model";
import { Request, Response } from "express";
import { sendResponse } from "../library/utils.library";
import Joi from "joi";

export async function createQuestion(req: Request, res: Response) {
  const tag = "[question.controller.ts][createQuestion]";
}

export async function getQuestions(req: Request, res: Response) {
  const tag = "[question.controller.ts][getQuestions]";

  const schema = Joi.object({
    category: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const { category } = value;

  try {
    const questions = await Question.find({ category }).select("-createdAt -updatedAt -__v");

    if (questions.length < 1) {
        sendResponse(res, {
            message: "No questions found",
            status: "failed",
        }, 404)
        return
    }
    sendResponse(res, { status: "success", message:"Questions accessed", data: questions });
    return
  } catch (error: any) {
    const tag = "[question.controller.ts][getQuestions]";
    console.log(`${tag} Error: ${error}`);
    sendResponse(res, { message: "Internal Server Error", status: "error" }, 500);
    return
  }
}