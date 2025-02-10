import mongoose, { Schema } from "mongoose"

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ["option", "multiselect", "text"]
        },
        options: {
            type: Array,
            default: []
        },
        category: {
            type: String,
            required: true,
            enum: ["therapist-registration", "Client"],
        },
        index: {
            type: Number,
            unique: true,
            required: true
        },
        tag: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema)

export default Question
