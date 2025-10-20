import { StatusCodes } from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IAuthMethod, IUser, UserRole } from './user.interface';
import { User } from './user.model';
import bcrypt from "bcryptjs";
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email })

  if(isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exist")
  }

  const hashedPassword = await bcrypt.hash(password as string, +envVars.BCRYPT_SALT)

  const authProvider: IAuthMethod = { 
    provider: 'credentials', 
    providerId: email as string 
  }

  const user = await User.create({ 
    email, 
    password: hashedPassword,
    auth: [authProvider], 
    ...rest 
  });

  return user;
};


const getAllUsers = async () => {
  const userAll = await User.find({});

  const totalUsers = await User.countDocuments()

  return { userAll, totalUsers };
};

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
  const isUserExist = await User.findById(userId)

  if(!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
  }

  if(payload.role) {
    if(decodedToken.role === UserRole.User || decodedToken.role === UserRole.Guide) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
    }

    if(payload.role === UserRole.SuperAdmin || decodedToken.role === UserRole.Admin) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
    }
  }

  if(payload.isActive || payload.isDeleted || payload.isVerified) {
    if(decodedToken.role === UserRole.User || decodedToken.role === UserRole.Guide) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

  return updatedUser
}


export const userService = {
  createUser,
  getAllUsers,
  updateUser
};
