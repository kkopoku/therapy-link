import mongoose, { Schema } from "mongoose"

const answerSchema = new Schema(
    {
        questionId: {
            type: Schema.ObjectId,
            required: true,
            ref: "Question"
        },
        answer: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema)

export default Answer
