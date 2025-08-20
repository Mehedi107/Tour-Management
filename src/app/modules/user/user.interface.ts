import { Types } from 'mongoose';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guide = 'guide',
  SuperAdmin = 'super_admin',
}

export interface IAuthMethod {
  provider: "google" | "credentials";
  providerId: string;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Blocked = 'blocked',
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: UserStatus;
  isVerified?: boolean;
  role: UserRole;
  auth: IAuthMethod[];
  booking?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
