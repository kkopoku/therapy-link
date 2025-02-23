import mongoose, { Schema } from "mongoose"

const sessionSchema = new Schema(
    {
        duration: {
            type: Number,
            required: true,
        },
        therapist: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Therapist"
        },
        client: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Client"
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema)

export default Session
