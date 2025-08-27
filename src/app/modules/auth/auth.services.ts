import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import bcrypt from 'bcryptjs';

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email })

  if(!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exists!")
  }

  const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

  if(!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Password!")
  }

  return {
    email: isUserExist.email
  }

}

export const authServices = {
  credentialsLogin
}