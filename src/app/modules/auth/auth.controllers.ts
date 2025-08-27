/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await authServices.credentialsLogin(req.body);

  sendResponse(res, {
    data: user,
    message: '✅ User successfully logged in',
    statusCode: StatusCodes.OK,
    success: true,
  })
})

export const authController = {
  credentialsLogin
}