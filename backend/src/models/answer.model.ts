import mongoose, { Schema } from "mongoose"

const answerSchema = new Schema(
    {
        questionId: {
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

const Answer = mongoose.model("Answer", answerSchema)

export default Answer
