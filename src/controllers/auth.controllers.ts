import { Request, Response } from 'express'
import * as authServices from '../services/auth.services'
import { Error } from '../enums'
import { generateToken } from '../helpers/jwt'

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authServices.signUp(req.body)

    if (user === Error.EXISTING_RECORD) {
      res.status(404).send({
        status: 404,
        message: 'Username or Email already registered.'
      })
    } else if (user === Error.BAD_REQUEST) {
      res.status(404).send({
        status: 404,
        message: 'Bad request.'
      })
    } else {
      res.status(200).send({
        status: 200,
        data: user
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
    console.log(error)
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
    } else if (session !== Error.EXISTING_RECORD && session !== Error.INTERNAL_ERROR && session !== Error.EMPTY_RESPONSE) {
      const token = await generateToken(session)
      res.status(200).send({
        status: 200,
        token
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
    console.log(error)
  }
}
