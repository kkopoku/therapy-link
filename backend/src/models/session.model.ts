import mongoose, { Schema } from "mongoose"

const sessionSchema = new Schema(
    {
        duration: {
            type: Number,
            required: true,
        },
        therapistId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        clientId: {
            type: Schema.Types.ObjectId,
            required: true
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
