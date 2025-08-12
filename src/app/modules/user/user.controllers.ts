import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.services';
// import AppError from '../../errorHelpers/AppError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new Error('Error from user controller line 11');
    // throw new AppError(
    //   StatusCodes.BAD_REQUEST,
    //   'Error from user controller line 11'
    // );

    const user = await userService.createUser(req.body);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: '✅ User created successfully!',
      data: user,
    });
  } catch (error) {
    // console.log('❌ Failed to create user', error, 'form user controller');
    // res.status(StatusCodes.BAD_REQUEST).json({
    //   status: false,
    //   message: '❌ Failed to create user',
    // });

    next(error);
  }
};

export const userController = {
  createUser,
};
