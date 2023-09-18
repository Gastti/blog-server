import jwt from 'jsonwebtoken'
import { Error } from '../enums'
import { ITokenPayload } from '../types'

const ACCESS_JWT_SECRET_KEY: string | undefined = process.env.ACCESS_JWT_SECRET_KEY
const REFRESH_JWT_SECRET_KEY: string | undefined = process.env.REFRESH_JWT_SECRET_KEY

export const generateToken = async (userData: ITokenPayload, isAccessToken: boolean): Promise<string | Error> => {
  const payload = userData
  const options = { expiresIn: isAccessToken ? '1m' : '1d' }

  return await new Promise((resolve, reject) => {
    try {
      if (ACCESS_JWT_SECRET_KEY === undefined) reject(Error.BAD_REQUEST)
      else if (REFRESH_JWT_SECRET_KEY === undefined) reject(Error.BAD_REQUEST)
      else {
        const token = jwt.sign(
          payload,
          isAccessToken ? ACCESS_JWT_SECRET_KEY : REFRESH_JWT_SECRET_KEY,
          options
        )
        resolve(token)
      }
    } catch (error) {
      console.log(error)
      reject(Error.INTERNAL_ERROR)
    }
  })
}
