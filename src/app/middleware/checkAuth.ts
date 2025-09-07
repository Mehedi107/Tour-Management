import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError"
import { verifyToken } from "../utils/jwt"
import { envVars } from "../config/env"
import { JwtPayload } from "jsonwebtoken"
import { UserRole } from "../modules/user/user.interface"

export const checkAuth = () => 
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization

    if(!accessToken) {
      throw new AppError(403, "Do not have any access token")
    }

    // const isVerifiedToken = jwt.verify(accessToken, 'secret')
    const isVerifiedToken = verifyToken(accessToken, envVars.JWT_SECRET) as JwtPayload

    if((isVerifiedToken as JwtPayload).role !== UserRole.Admin && (isVerifiedToken as JwtPayload).role !== UserRole.SuperAdmin) {
      throw new AppError(403, 'You are not authorized to access this data')
    }

    next()
}