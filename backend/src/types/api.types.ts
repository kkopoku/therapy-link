import { Request } from "express";

export interface ApiRequest extends Request{
    user: {
        type: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export interface ApiResponse<T> {
    data?: T | null;
    status: "success" | "error" | "failed";
    message: string;
}
