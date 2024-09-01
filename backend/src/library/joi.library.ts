//custom Joi validation rules

import { CustomHelpers, ErrorReport } from "joi";
import mongoose from "mongoose";

export const objectId = (value: string, helpers: CustomHelpers): string | ErrorReport => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid ObjectId format" });
    }
    return value;
}


export const msisdn = (value: string, helpers: CustomHelpers): string | ErrorReport => {
    const regex = /^233[0-9]{9}$/
    if (!regex.test(value)) {
        return helpers.message({ custom: "Invalid phone number format"});
    }
    return value;
}