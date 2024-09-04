import mongoose, { Schema } from "mongoose"

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: Date,
            required: true
        },
        answerType: {
            type: String,
            required: true,
            enum: ["Single", "Multiple"],
        }
    },
    { timestamps: true }
);

const Question = mongoose.model("Session", questionSchema)

export default Question
