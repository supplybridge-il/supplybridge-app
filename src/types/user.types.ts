export enum UserRole {
  SUPPLIER = 'SUPPLIER',
  IMPORTER = 'IMPORTER',
  MANUFACTURER = 'MANUFACTURER',
  ADMIN = 'ADMIN'
}

export enum UserTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  companyName: string;
  tier: UserTier;
  isVerified: boolean;
  createdAt: Date;
}

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  tier: UserTier;
}