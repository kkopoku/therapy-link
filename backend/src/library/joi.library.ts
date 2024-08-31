//custom Joi validation rules

import Joi from "joi";
import mongoose from "mongoose";

export const objectIdValidator = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({custom:"Invalid ObjectId format"});
    }
    return value;
}, "ObjectId Validation");