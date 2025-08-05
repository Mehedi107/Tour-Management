import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: '✅ User created successfully!',
      data: user,
    });
  } catch (error) {
    console.log('❌ Failed to create user', error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: '❌ Failed to create user',
    });
  }
};

export const userController = {
  createUser,
};
