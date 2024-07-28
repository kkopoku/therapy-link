import { Schema } from "mongoose";
import User from "./user.model"

const therapistSchema = new Schema(
  {
    momoNumber:{
      type: String,
      required: true,
    },
    momoNetwork:{
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

const Therapist = User.discriminator("Therapist", therapistSchema);

export default Therapist;
