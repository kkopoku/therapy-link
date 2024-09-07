import mongoose, { Schema } from "mongoose"

const transactionSchema = new Schema({
    amount: {
        type: Schema.Types.Decimal128,
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
        required: true
    }
},{timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction