import { Schema, model, models } from 'mongoose';
import { UserRole, UserTier } from '@/types/user.types';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: Object.values(UserRole), required: true },
  companyName: { type: String, required: true },
  tier: { type: String, enum: Object.values(UserTier), default: UserTier.FREE },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default models.User || model('User', UserSchema);