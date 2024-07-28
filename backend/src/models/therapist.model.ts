import mongoose, { Schema } from "mongoose";

const therapistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    otherNames:{
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    momoNumber:{
      type: String,
      required: true,
    },
    momoNetwork:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Therapist", therapistSchema);

export default User;
