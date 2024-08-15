import mongoose, { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  emailVerified: boolean;
  password: string;
  primaryPhone: string;
  userType: 'Administrator' | 'Client' | 'Therapist';
  secondaryPhone?: string;
}

interface IUserMethods{
  check(): string;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: false},
    password: { type: String, required: true },
    primaryPhone: { type: String, required: false },
    secondaryPhone: { type: String, required: false},
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
  console.log("I want to check here: "+this.userType)
  return jwt.sign(
    {
      email: this.email,
      password: this.password
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

const User = model<IUser, UserModel>('User', userSchema);
export default User;
