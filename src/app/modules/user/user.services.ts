import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({ name, email });
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
