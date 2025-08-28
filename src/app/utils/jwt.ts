import jwt, { SignOptions } from 'jsonwebtoken'

export const generateToken = (payload: string | object | Buffer, secretKey: string, expiresIn: string): string => {
  const token = jwt.sign(payload, secretKey, {expiresIn} as SignOptions)

  return token
}


export const verifyToken = (token: string, secretKey: string) => {
  const decodedToken = jwt.verify(token, secretKey)

  return decodedToken
}


