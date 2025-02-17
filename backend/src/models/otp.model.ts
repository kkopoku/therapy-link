import mongoose, { Schema } from "mongoose";

const OTPSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    purpose:{
      type: String,
      required: true,
      enum: ["client-registration"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    used: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
