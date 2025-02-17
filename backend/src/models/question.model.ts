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
            enum: ["option", "multiselect", "text", "date"]
        },
        options: {
            type: Array,
            default: []
        },
        category: {
            type: String,
            required: true,
            enum: ["therapist-registration", "client-registration-couple","client-registration-individual"],
        },
        index: {
            type: Number,
            unique: false
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
