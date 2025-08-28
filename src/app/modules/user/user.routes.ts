import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserZodSchema } from './user.zodSchema';
import AppError from '../../errorHelpers/AppError';
import { JwtPayload } from 'jsonwebtoken'
import { UserRole } from './user.interface';
import { verifyToken } from '../../utils/jwt';
import { envVars } from '../../config/env';

export const userRoute = Router();

const checkAuth = () => async (req: Request, res: Response, next: NextFunction) =>  {
  const accessToken = req.headers.authorization

  if(!accessToken) {
    throw new AppError(403, "Do not have any access token")
  }

  // const isVerifiedToken = jwt.verify(accessToken, 'secret')
  const isVerifiedToken = verifyToken(accessToken, envVars.JWT_EXPIRES)

  if((isVerifiedToken as JwtPayload).role !== UserRole.Admin && (isVerifiedToken as JwtPayload).role !== UserRole.SuperAdmin) {
    throw new AppError(403, 'You are not authorized to access this data')
  }

  next()
}

userRoute.post('/register', validateRequest(createUserZodSchema), userController.createUser);
userRoute.get('/all-users', checkAuth, userController.getAllUsers);
