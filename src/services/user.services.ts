import { Error } from '../enums'
import { UserModel } from '../models/user.schema'
import { EditUserEntry, IUser } from '../types'
import bcryptjs from 'bcryptjs'

export const getAllUsers = async (): Promise<IUser[] | Error> => {
  try {
    const users = await UserModel.find({ isDeleted: false })
      .select('-password -createdAt -updatedAt')

    if (users.length > 0) return users
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in user.services.ts - getAllUsers', error)
    return Error.BAD_REQUEST
  }
}

export const getUser = async (userId: string): Promise<IUser | Error> => {
  try {
    const user = await UserModel.findOne({
      $and: [
        { _id: userId },
        { isDeleted: false }
      ]
    })
      .select('-password -createdAt -updatedAt')

    if (user !== null) return user
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in user.services.ts - getUser', error)
    return Error.BAD_REQUEST
  }
}

export const editUser = async (userId: string, newUserData: EditUserEntry): Promise<IUser | Error> => {
  try {
    const user = await UserModel.findOneAndUpdate({
      $and: [
        { _id: userId },
        { isDeleted: false }
      ]
    }, newUserData, { new: true })
      .select('-password -createdAt -updatedAt')

    if (user !== null) return user
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in user.services.ts - editUser', error)
    return Error.BAD_REQUEST
  }
}

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise <IUser | Error> => {
  try {
    const user = await UserModel.findOne({
      $and: [
        { _id: userId },
        { isDeleted: false }
      ]
    })

    if (user === null) return Error.EMPTY_RESPONSE

    const checkPassword: boolean = bcryptjs.compareSync(oldPassword, user.password)
    if (!checkPassword) return Error.WRONG_CREDENTIALS

    const salt = bcryptjs.genSaltSync(15)
    const hashedPassword = bcryptjs.hashSync(newPassword, salt)

    user.password = hashedPassword
    await user.save()
    return user
  } catch (error) {
    console.log('Error in user.services.ts - changePassword', error)
    return Error.BAD_REQUEST
  }
}

export const deleteUser = async (userId: string): Promise<IUser | Error> => {
  try {
    const user = await UserModel.findOneAndUpdate({
      $and: [
        { _id: userId },
        { isDeleted: false }
      ]
    }, { isDeleted: true }, { new: true })
    if (user !== null) return user
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in user.services.ts - editUser', error)
    return Error.BAD_REQUEST
  }
}
