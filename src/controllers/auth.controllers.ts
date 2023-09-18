import { Request, Response } from 'express'
import * as authServices from '../services/auth.services'
import { Error } from '../enums'
import { generateToken } from '../helpers/jwt'
import { sendResponse } from '../utils/response.utils'
import { TokenModel } from '../models/token.schema'

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await authServices.signUp(req.body)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const session = await authServices.signIn({ email, password })
    if (session === Error.NON_EXISTING_RECORD) {
      res.status(404).send({
        status: 404,
        message: 'Non-existent user.'
      })
    } else if (session === Error.WRONG_CREDENTIALS) {
      res.status(404).send({
        status: 404,
        message: 'Email/Password incorrect.'
      })
    } else if (session === Error.BAD_REQUEST) {
      res.status(404).send({
        status: 404,
        message: 'Bad request.'
      })
    } else if (
      session !== Error.EXISTING_RECORD &&
      session !== Error.INTERNAL_ERROR &&
      session !== Error.EMPTY_RESPONSE
    ) {
      const accessToken = await generateToken(session, true)
      const refreshToken = await generateToken(session, false)
      // Guardar refresh token en la base de datos
      await TokenModel.create({ token: refreshToken })
      res.status(200).send({
        status: 200,
        accessToken,
        refreshToken
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin asd.'
    })
    console.log(error)
  }
}

export const refreshSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorization: string = req.header('Authorization') as string
    const token = authorization.split(' ')[1]
    const response = await authServices.refreshSession(token)
    console.log(response)
    sendResponse(res, response)
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
    console.log(error)
  }
}
