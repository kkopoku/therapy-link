import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  password: string;
  primaryPhone: string;
  userType: 'Administrator' | 'Client' | 'Therapist';
  secondaryPhone?: string;
  check(): string; // Custom method
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    secondaryPhone: { type: String },
    userType: { type: String, required: true, enum: ['Therapist', 'Client', 'Administrator'] },
  },
  { discriminatorKey: 'userType', timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e: any) {
    next(e);
  }
});

userSchema.methods.createJWT = function (): string {
  return jwt.sign(
    {
      employee_id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      organisation_id: this.organisation_id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.check = function (): string {
  return this.userType;
};

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
