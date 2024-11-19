import "express";
import { Schema } from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        user: {
            type: "Administrator" | "Client" | "Therapist";
            firstName: string;
            otherNames: string;
            email: string;
            id: Schema.Types.ObjectId
        };
    }
}
