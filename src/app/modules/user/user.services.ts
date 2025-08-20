import { StatusCodes } from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IAuthMethod, IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;

  const isUserExist = await User.findOne({ email })

  if(isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exist")
  }

  const authProvider: IAuthMethod = { 
    provider: 'credentials', 
    providerId: email as string 
  }

  const user = await User.create({ 
    email, 
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


export const userService = {
  createUser,
  getAllUsers,
};
