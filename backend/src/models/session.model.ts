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
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema)

export default Session
