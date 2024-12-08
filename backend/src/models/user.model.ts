import mongoose, { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  firstName: string
  otherNames: string
  email: string
  emailVerified: boolean
  password: string
  primaryPhone: string
  userType: 'Administrator' | 'Client' | 'Therapist'
  secondaryPhone?: string
  avatar?: Schema.Types.ObjectId
}

interface IUserMethods {
  check(): string
  createJWT(): string
  comparePassword(candidatePassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: true },
    otherNames: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: false },
    password: { type: String, required: true },
    primaryPhone: { type: String, required: false },
    secondaryPhone: { type: String, required: false },
    userType: { type: String, required: true, enum: ['Therapist', 'Client', 'Administrator'] },
    avatar: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "File"
    }
  },
  { discriminatorKey: 'userType', timestamps: true }
);

// userSchema.pre('save', async function (next) {
//   try {
//     if (this.isModified('password')) {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
//   } catch (e: any) {
//     next(e);
//   }
// });

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update && typeof update === 'object' && 'password' in update) {
    try {
      const salt = await bcrypt.genSalt(10);
      (update as mongoose.UpdateQuery<any>).password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
    } catch (e: any) {
      return next(e);
    }
  }

  next();
});

userSchema.methods.createJWT = function (): string {
  return jwt.sign(
    {
      id: this.id,
      firstName: this.firstName,
      otherNames: this.otherNames,
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
