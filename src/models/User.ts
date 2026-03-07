import { Schema, model, models, Document } from 'mongoose';
import { UserRole, UserTier, IUser } from '@/types/user.types';
import bcrypt from 'bcryptjs';

const CompanySchema = new Schema({
  name: { type: String, required: true },
}, { _id: false });

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: Object.values(UserRole), required: true },
  company: { type: CompanySchema, required: true },
  tier: { type: String, enum: Object.values(UserTier), default: UserTier.FREE },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });


UserSchema.pre('save', async function (this: Document & IUser) {
  if (!this.isModified('password') || !this.password) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export default models.User || model<IUser>('User', UserSchema);