import jwt from 'jsonwebtoken'
import { Error } from '../enums'
import { ITokenPayload } from '../types'

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY

export const generateToken = async (userData: ITokenPayload): Promise<string | Error> => {
  const payload = userData
  const options = { expiresIn: '60m' }

  return await new Promise((resolve, reject) => {
    try {
      if (JWT_SECRET_KEY === undefined) reject(Error.BAD_REQUEST)
      else {
        const token = jwt.sign(payload, JWT_SECRET_KEY, options)
        resolve(token)
      }
    } catch (error) {
      console.log(error)
      reject(Error.INTERNAL_ERROR)
    }
  })
}
