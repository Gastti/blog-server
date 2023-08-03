import jwt from 'jsonwebtoken'
import { Error } from '../enums'

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY

export const generateToken = async (userId: string): Promise<string | Error> => {
  const payload = { user_id: userId }
  const options = { expiresIn: '60m' }

  return await new Promise((resolve, reject) => {
    if (JWT_SECRET_KEY === undefined) reject(Error.BAD_REQUEST)
    const token = jwt.sign(payload, JWT_SECRET_KEY, options)
    resolve(token)
  })
}
