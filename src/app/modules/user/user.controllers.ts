import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.services';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = userService.createUser(req.body);

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
