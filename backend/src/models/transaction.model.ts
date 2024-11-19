import mongoose, { Schema } from "mongoose"

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["credit","debit"]
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["success","pending","failed"],
        default: "pending"
    },
    reference: {
        type: String,
        required: false,
        default: null
    },
    paymentStage: {
        type: String,
        required: false,
        enum: ["pending","timeout","success","send_birthday","send_otp","failed"]
    },
    reason: {
        type: String,
        required: true,
    }
},{timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction