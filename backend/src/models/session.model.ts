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
        price: {
            type: Schema.Types.Decimal128,
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
        },
        transaction: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Transaction"
        }
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema)

export default Session
