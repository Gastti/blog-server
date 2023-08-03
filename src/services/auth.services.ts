import { Role, Error } from '../enums'
import { UserModel } from '../models/user.schema'
import { IUser, UserCredentials, NewUserEntry } from '../types'
import bcryptjs from 'bcryptjs'

export const signUp = async (newUserEntry: NewUserEntry): Promise<IUser | Error> => {
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
      avatar: ''
    })

    return user
  } catch (error) {
    console.log('Error in auth.services.ts - signUp', error)
    return Error.BAD_REQUEST
  }
}

export const signIn = async (loginData: UserCredentials): Promise<string | Error> => {
  try {
    const { email, password } = loginData
    const user = await UserModel.findOne({ email })

    if (user == null) return Error.NON_EXISTING_RECORD

    const checkPassword: boolean = bcryptjs.compareSync(password, user?.password)
    if (!checkPassword) return Error.WRONG_CREDENTIALS

    const userId: string = user._id.toString()

    return userId
  } catch (error) {
    console.log('Error in auth.services.ts - signIn', error)
    return Error.BAD_REQUEST
  }
}
