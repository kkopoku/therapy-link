import "express";

declare module "express-serve-static-core" {
    interface Request {
        user: {
            type: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    }
}
