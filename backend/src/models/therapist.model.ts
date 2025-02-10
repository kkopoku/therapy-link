import { Schema } from "mongoose";
import User from "./user.model"

const therapistSchema = new Schema(
  {
    momoNumber:{
      type: String,
      required: false,
    },
    momoNetwork:{
      type: String,
      required: false,
    },
    specialty:{
      type: String,
      required: false,
    },
    availability:{
      type: String,
      required: false,
    },
    bio:{
      type: String,
      required: false,
    },
    onboardingStatus: {
      type: String,
      required: false,
      enum: ["Application In Review", "Onboarding Completed", "Onboarding Rejected"],
      default: "Application In Review"
    }
  },{ discriminatorKey: 'userType' }
);

const Therapist = User.discriminator("Therapist", therapistSchema);

export default Therapist;
