/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.services';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
// import AppError from '../../errorHelpers/AppError';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.createUser(req.body);

  sendResponse(res, {
    data: user,
    message: '✅ User created successfully!',
    statusCode: StatusCodes.OK,
    success: true,
  })
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    data: result.userAll,
    message: '✅ Retrieve all users successfully!',
    statusCode: StatusCodes.OK,
    success: true,
    meta: {total: result.totalUsers}
  })
})


export const userController = {
  createUser,
  getAllUsers,
}
