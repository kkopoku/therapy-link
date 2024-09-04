import "express";

declare module "express-serve-static-core" {
    interface Request {
        user: {
            type: "Administrator" | "Client" | "Therapist";
            firstName: string;
            lastName: string;
            email: string;
        };
    }
}
