/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.services';
import { catchAsync } from '../../utils/catchAsync';
// import AppError from '../../errorHelpers/AppError';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.createUser(req.body);

  res.status(StatusCodes.CREATED).json({
      status: true,
      message: '✅ User created successfully!',
      data: user,
  });
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userService.getAllUsers();

  res.status(StatusCodes.OK).json({
    status: true,
    message: '✅ Retrieve all users successfully!',
    data: users,
  });
})


export const userController = {
  createUser,
  getAllUsers,
}
