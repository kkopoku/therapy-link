import User from "../models/user.model"
import { Request, Response } from "express"
import Joi from "joi"
import { createUser } from "../library/user.library"
import { sendResponse } from "../library/utils.library"
import path from "path";
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";


enum UserType {
    Administrator = "Administrator",
    Client = "Client",
    Therapist = "Therapist"
}


export async function registerUser(req: Request, res: Response) {
    const tag = "[auth.controller.ts][registerUser]"
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        type: Joi.string().valid(...Object.values(UserType)).required(),
    }).unknown(true)

    const { error, value } = schema.validate(req.body)

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email } = value
    try{
        const foundUser = await User.findOne({ email }).lean().exec()
        if(foundUser){
            return sendResponse(res,{
                message: "User already exists",
                status: "failed"
            },400)
        }

        const user = await createUser(req.body)

    if (user)
      return res
        .status(200)
        .json({ user, message: "You have successfully created your account" })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export async function login(req: Request, res: Response): Promise<void | {}> {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email, password } = value
    try{
        const foundUser = await User.findOne({ email })
        if(!foundUser){
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }


        const passwordCheck:boolean = await foundUser.comparePassword(password)
        if(!passwordCheck){
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }

        const token = foundUser.createJWT()

        return res
            .status(200)
            .json({ user:foundUser, token, message: "You logged in successfully" })

    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export async function registrationInitiate(req: Request, res: Response) {
    const tag = "[therapist.controller.ts][registrationInitiate]";
    const { DO_SPACES_BUCKET, DO_SPACES_KEY, DO_SPACES_REGION, DO_SPACES_ENDPOINT, DO_SPACES_SECRET } = process.env;

    if (!req.file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const s3 = new S3Client({
        region: String(DO_SPACES_REGION),
        endpoint: String(DO_SPACES_ENDPOINT),
        credentials: {
            accessKeyId: String(DO_SPACES_KEY),
            secretAccessKey: String(DO_SPACES_SECRET),
        },
    });

    try {
        const fileName = `uploads/${Date.now()}-${path.extname(req.file.originalname)}`;

        const uploadParams = {
            Bucket: String(DO_SPACES_BUCKET),
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${DO_SPACES_BUCKET}.${DO_SPACES_REGION}.digitaloceanspaces.com/${fileName}`;

        return res.json({
            status: "success",
            message: "File uploaded successfully",
            fileUrl: fileUrl,
        });

    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ status: "error", message: "Failed to upload file" });
    }
}