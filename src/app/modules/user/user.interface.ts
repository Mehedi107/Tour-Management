import { Types } from 'mongoose';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guide = 'guide',
  SuperAdmin = 'super_admin',
}

export enum AuthMethod {
  Google = 'google',
  Credentials = 'credentials',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Blocked = 'blocked',
}

interface IUser {
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
  auth: AuthMethod;
  booking?: Types.ObjectId[];
  guides?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
