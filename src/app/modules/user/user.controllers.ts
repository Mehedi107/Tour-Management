/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.services';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { verifyToken } from '../../utils/jwt';
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';

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

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  const payload = req.body
  const token = req.headers.authorization
  const verifiedToken = verifyToken(token as string, envVars.JWT_SECRET) as JwtPayload
  const user = await userService.updateUser(userId, payload, verifiedToken)

  sendResponse(res, {
    data: user,
    message: '✅ User updated successfully!',
    statusCode: StatusCodes.OK,
    success: true,
  })
})


export const userController = {
  createUser,
  getAllUsers,
  updateUser
}
