import { Role, Error } from '../enums'
import { generateToken } from '../helpers/jwt'
import { TokenModel } from '../models/token.schema'
import { UserModel } from '../models/user.schema'
import { UserCredentials, NewUserEntry, ITokenPayload, ITokenData, NonSensitiveUserData } from '../types'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const REFRESH_JWT_SECRET_KEY: string | undefined = process.env.REFRESH_JWT_SECRET_KEY

export const signUp = async (newUserEntry: NewUserEntry): Promise<NonSensitiveUserData | Error> => {
  try {
    const { username, firstname, lastname, email, password } = newUserEntry

    const findExistingUser = await UserModel.findOne({
      $or: [
        { username },
        { email }
      ]
    })

    if (findExistingUser !== null) {
      return Error.EXISTING_RECORD
    }

    const salt = bcryptjs.genSaltSync(15)
    const hashedPassword = bcryptjs.hashSync(password, salt)

    const user = await UserModel.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: Role.Reader,
      avatar: 'https://i.ibb.co/JnWfTfP/user.png',
      biography: '',
      contactUrl: ''
    })

    const nonSensitiveUserData = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      avatar: user.avatar,
      biography: user.biography,
      contactUrl: user.contactUrl
    }

    return nonSensitiveUserData
  } catch (error) {
    console.log('Error in auth.services.ts - signUp', error)
    return Error.BAD_REQUEST
  }
}

export const signIn = async (loginData: UserCredentials): Promise<ITokenPayload | Error> => {
  try {
    const { email, password } = loginData
    const user = await UserModel.findOne({ email })

    if (user == null) return Error.NON_EXISTING_RECORD

    const checkPassword: boolean = bcryptjs.compareSync(password, user?.password)
    if (!checkPassword) return Error.WRONG_CREDENTIALS

    const userId: string = user._id.toString()
    const userRole: string = user.role
    const tokenPayload: ITokenPayload = {
      userId,
      userRole
    }

    return tokenPayload
  } catch (error) {
    console.log('Error in auth.services.ts - signIn', error)
    return Error.BAD_REQUEST
  }
}

export const refreshSession = async (oldRefreshToken: string): Promise<object | Error> => {
  try {
    const findToken = await TokenModel.findOne({ token: oldRefreshToken })
    if (findToken === null) {
      return Error.NON_EXISTING_RECORD
    }
    if (REFRESH_JWT_SECRET_KEY !== undefined) {
      const tokenData = jwt.verify(oldRefreshToken, REFRESH_JWT_SECRET_KEY) as ITokenData

      if (tokenData !== null) {
        const tokenPayload = {
          userId: tokenData.userId,
          userRole: tokenData.userRole
        }

        const newAccessToken = await generateToken(tokenPayload, true)
        const newRefreshToken = await generateToken(tokenPayload, false)

        await TokenModel.create({ token: newRefreshToken })
        await findToken.deleteOne()

        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        }
      }
    }
    return Error.BAD_REQUEST
  } catch (error) {
    console.log('Error in auth.services.ts - refreshSession', error)
    return Error.BAD_REQUEST
  }
}
