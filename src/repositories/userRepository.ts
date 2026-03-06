import User from '@/models/User';
import dbConnect from '@/lib/db/connect';
import { IUser, UserTier } from '@/types/user.types';

export const userRepository = {
  async findByEmail(email: string): Promise<IUser | null> {
    await dbConnect();
    return User.findOne({ email }).lean();
  },

  async createUser(data: Partial<IUser>): Promise<IUser> {
    await dbConnect();
    return User.create(data);
  },

  async updateTier(id: string, tier: UserTier): Promise<IUser | null> {
    await dbConnect();
    return User.findByIdAndUpdate(id, { tier }, { new: true }).lean();
  }
};