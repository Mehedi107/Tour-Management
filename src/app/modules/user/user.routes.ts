import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserZodSchema } from './user.zodSchema';
import AppError from '../../errorHelpers/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserRole } from './user.interface';

export const userRoute = Router();

userRoute.post('/register', validateRequest(createUserZodSchema), userController.createUser);
userRoute.get('/all-users', async (req: Request, res: Response, next: NextFunction) =>  {
  const accessToken = req.headers.authorization

  if(!accessToken) {
    throw new AppError(403, "Do not have any access token")
  }

  const isVerifiedToken = jwt.verify(accessToken, 'secret')

  console.log(isVerifiedToken);

  if((isVerifiedToken as JwtPayload).role !== UserRole.Admin && (isVerifiedToken as JwtPayload).role !== UserRole.SuperAdmin) {
    throw new AppError(403, 'You are not authorized to access this data')
  }

  next()
}, userController.getAllUsers);
