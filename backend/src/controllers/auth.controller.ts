import User from "../models/user.model";
import { Request, Response } from "express";
import Joi from "joi";
import { createUser } from "../library/user.library";
import { sendResponse } from "../library/utils.library";
import eventEmitter from "../config/events.config";
import crypto from "crypto";
import Answer from "../models/answer.model";
import { sendClientRegisteredEmail } from "../emails/client-registered.email";
import { createOTP } from "../library/otp.library";
import Administrator from "../models/administrator.model";
import { logger } from "../config/logger.config";

enum UserType {
  Administrator = "Administrator",
  Client = "Client",
  Therapist = "Therapist",
}

export async function registerUser(req: Request, res: Response) {
  const tag = "[auth.controller.ts][registerUser]";
  logger.info(`${tag} Received user registration request: ${JSON.stringify(req.body)}`);

  const schema = Joi.object({
    firstName: Joi.string().required(),
    otherNames: Joi.string().required(),
    primaryPhone: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    type: Joi.string()
      .valid(...Object.values(UserType))
      .required(),
    answers: Joi.string().optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    logger.warn(`${tag} Validation error: ${error.details[0].message}`);
    return sendResponse(res, { message: error.details[0].message, status: "failed" }, 400);
  }

  const { email } = value;
  try {
    const foundUser = await User.findOne({ email }).lean().exec();
    if (foundUser) {
      logger.info(`${tag} User with email ${email} already exists`);
      return sendResponse(res, { message: "User already exists", status: "failed" }, 400);
    }

    const user = await createUser(value);
    logger.info(`${tag} User created successfully: ${user._id}`);

    if (value.answers) {
      try {
        const formatted = JSON.parse(value.answers);
        for (const id in formatted) {
          const sAnswer = Array.isArray(formatted[id]) ? formatted[id].join("") : formatted[id];
          await Answer.create({ questionId: id, answer: sAnswer, owner: user._id });
        }
        logger.info(`${tag} Answers saved successfully for user: ${user._id}`);
      } catch (error: any) {
        logger.error(`${tag} Failed to parse answers`, error);
      }
    }

    const otp = await createOTP("client-registration", user._id).catch((error) => {
      logger.error(`${tag} Failed to create OTP`, error);
      return null;
    });

    if (otp) {
      sendClientRegisteredEmail(user.email, otp);
      logger.info(`${tag} OTP sent to user email: ${user.email}`);
    }

    sendResponse(res, {
      message: "You have successfully created your account",
      status: "success",
      data: { user },
    }, 200);
  } catch (error: any) {
    logger.error(`${tag} Error during user registration`, error);
    sendResponse(res, { message: error.message || "Internal Server Error", status: "failed" }, 500);
  }
}

export async function therapistRegister(req: Request, res: Response) {
  const tag = "[therapist.controller.ts][therapistRegister]";
  logger.info(`${tag} Therapist application request received: ${JSON.stringify(req.body)}`);

  if (!req.file) {
    logger.warn(`${tag} No resume uploaded`);
    return res.status(400).json({ status: "error", message: "No resume uploaded" });
  }
  eventEmitter.emit("uploadResume", { file: req.file });

  req.body.password = crypto.randomBytes(8).toString("base64").slice(0, 8);
  req.body.type = "Therapist";

  const schema = Joi.object({
    firstName: Joi.string().required(),
    otherNames: Joi.string(),
    email: Joi.string().email().required(),
    qualifications: Joi.string(),
    specialties: Joi.string(),
    bio: Joi.string(),
    password: Joi.string().required(),
    type: Joi.string().required(),
    answers: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    logger.warn(`${tag} Validation error: ${error.details[0].message}`);
    return res.status(400).json({ status: "error", message: error.details[0].message });
  }

  try {
    const foundUser = await User.findOne({ email: value.email }).lean().exec();
    if (foundUser) {
      logger.info(`${tag} Therapist with email ${value.email} already exists`);
      return sendResponse(res, { message: "User already exists", status: "failed" }, 400);
    }

    let createdTherapist = await createUser(value);
    logger.info(`${tag} Therapist created successfully: ${createdTherapist._id}`);

    if (value.answers) {
      const jsonAnswers = JSON.parse(value.answers);
      for (const id in jsonAnswers) {
        const sAnswer = Array.isArray(jsonAnswers[id]) ? jsonAnswers[id].join("") : jsonAnswers[id];
        await Answer.create({ questionId: id, answer: sAnswer, owner: createdTherapist._id });
      }
      logger.info(`${tag} Answers saved successfully for therapist: ${createdTherapist._id}`);
    }

    eventEmitter.emit("sendTherapistApplied", { recipients: value.email, therapistName: value.firstName });
    logger.info(`${tag} Therapist application email sent to ${value.email}`);

    const admins = await Administrator.find({}, "email").lean();
    const adminEmails = admins.map((admin: any) => admin.email).join(", ");
    eventEmitter.emit("sendNewTherapistNotification", { recipients: adminEmails });
    logger.info(`${tag} Notification sent to admins: ${adminEmails}`);

    sendResponse(res, { message: "Therapist request submitted successfully", status: "success", data: createdTherapist }, 201);
  } catch (error: any) {
    logger.error(`${tag} Error during therapist registration`, error);
    sendResponse(res, { message: "Something went wrong", status: "error" }, 500);
  }
}