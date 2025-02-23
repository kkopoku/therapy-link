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

enum UserType {
  Administrator = "Administrator",
  Client = "Client",
  Therapist = "Therapist",
}

export async function registerUser(req: Request, res: Response) {
  const tag = "[auth.controller.ts][registerUser]";
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
    return res.status(400).json({
      message: error.details[0].message,
      status: "failed",
    });
  }

  const { email } = value;
  try {
    const foundUser = await User.findOne({ email }).lean().exec();
    if (foundUser) {
      return sendResponse(
        res,
        {
          message: "User already exists",
          status: "failed",
        },
        400
      );
    }

    const user = await createUser(value);
    const answers = value?.answers

    if(answers){
        try{
            const formatted = JSON.parse(answers)
            for (const id in formatted){
                const sAnswer = Array.isArray(formatted[id]) ? formatted[id].join("") : formatted[id]
                await Answer.create({ questionId: id, answer: sAnswer, owner: user._id})
            }
        }catch(error:any){
            console.error("Failed to parse answers", error)
        }
    }

    const otp = await createOTP("client-registration", user._id).catch(error => {
        console.error("Failed to create OTP", error)
        return null
    });

    // dispatch account created mail
    if (otp) sendClientRegisteredEmail(user.email, otp)

    sendResponse(res, {
        message:"You have successfully created your account",
        status: "success",
        data: { user }
    }, 200)
    return;
  } catch (error:any) {
    console.log(error);
    sendResponse(res, {
        message: error.message || "Internal Server Error",
        status: "failed",
    }, 500)
    return;
  }
}

export async function login(req: Request, res: Response): Promise<void | {}> {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      status: "failed",
    });
  }

  const { email, password } = value;
  try {
    const foundUser:any = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        message: "Invalid credentials",
        status: "failed",
      });
    }

    if(!foundUser.emailVerified){
      sendResponse(res, {
        message: "Email not confirmed. Please check your email for the confirmation link.",
        status: "failed"
      }, 400)
      return
    }

    const passwordCheck: boolean = await foundUser.comparePassword(password);
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid credentials",
        status: "failed",
      });
    }

    const token = foundUser.createJWT();

    return res
      .status(200)
      .json({ user: foundUser, token, message: "You logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function therapistRegister(req: Request, res: Response) {
  const tag = "[therapist.controller.ts][therapistRegister]";

  console.log(
    `${tag} Therapist application request received: ${JSON.stringify(req.body)}`
  );

  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No resume uploaded" });
  }
  eventEmitter.emit("uploadResume", { file: req.file });

  // attach random password
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
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const { email, firstName, answers } = value;

  try {
    const foundUser = await User.findOne({ email }).lean().exec();
    if (foundUser) {
      sendResponse(
        res,
        {
          message: "User already exists",
          status: "failed",
        },
        400
      );
      return;
    }

    let createdTherapist = await createUser(value);

    const jsonAnswers = JSON.parse(answers);

    for (const id in jsonAnswers) {
      const sAnswer = Array.isArray(jsonAnswers[id])
        ? jsonAnswers[id].join("")
        : jsonAnswers[id];
      await Answer.create({
        questionId: id,
        answer: sAnswer,
        owner: createdTherapist._id,
      });
    }

    eventEmitter.emit("sendTherapistApplied", { recipients: email, therapistName: firstName });


    const admins = await Administrator.find({},"email").lean()
    const adminEmails = admins.map((admin:any) => admin.email).join(", ")

    eventEmitter.emit("sendNewTherapistNotification", { recipients: adminEmails});

    if (!createdTherapist) {
      sendResponse(
        res,
        {
          message: "Failed to create therapist",
          status: "failed",
        },
        500
      );
      return;
    }
    sendResponse(
      res,
      {
        message: "Therapist request submitted successfully",
        status: "success",
        data: createdTherapist,
      },
      201
    );
  } catch (error: any) {
    console.log(`${tag} Error: `, error);
    sendResponse(
      res,
      {
        message: "Something went wrong",
        status: "error",
      },
      500
    );
    return;
  }
}
