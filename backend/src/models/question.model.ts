import mongoose, { Schema } from "mongoose"

const questionSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        possibleAnswers: {
            type: Array,
            default: []
        },
        for: {
            type: String,
            required: true,
            enum: ["Therapist", "Client"],
        },
        index: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema)

export default Question
