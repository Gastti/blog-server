import { Request, Response } from 'express'
import * as userServices from '../services/user.services'
import { sendResponse } from '../utils/response.utils'

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await userServices.getAllUsers()
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const getMyUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.authenticatedUser
    const response = await userServices.getUser(userId)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const response = await userServices.getUser(userId)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userIdParam } = req.params
    const {
      firstname, lastname, biography, avatar, contactUrl
    } = req.body
    const newUserData = { firstname, lastname, biography, avatar, contactUrl }

    const response = await userServices.editUser(userIdParam, newUserData)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const changeUserPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.authenticatedUser
    const { oldPassword, newPassword } = req.body
    const response = await userServices.changePassword(userId, oldPassword, newPassword)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const response = await userServices.deleteUser(userId)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}
