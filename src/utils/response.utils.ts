import { Response } from 'express'
import { Error } from '../enums'
import { IComment, IPost, IUser, NonSensitiveUserData } from '../types'

export const sendResponse = (
  res: Response,
  response:
  Error | IComment[] | IComment | IUser[] | IUser | object | NonSensitiveUserData |
  IPost | IPost[]
): void => {
  if (response === Error.BAD_REQUEST) {
    res.status(400).send({
      status: 400,
      message: 'Bad Request.',
      data: []
    })
  } else if (response === Error.EMPTY_RESPONSE) {
    res.status(204).send({
      status: 204,
      message: 'Inexistent.',
      data: []
    })
  } else if (response === Error.EXISTING_RECORD) {
    res.status(409).send({
      status: 409,
      message: 'Email/Username already registered.',
      data: []
    })
  } else {
    res.status(200).send({
      status: 200,
      message: 'Ok',
      data: response
    })
  }
}
