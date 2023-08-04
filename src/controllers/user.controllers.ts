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
