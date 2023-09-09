import { Response } from 'express'
import { Error } from '../enums'
import { IComment, IUser, NonSensitiveUserData } from '../types'

export const sendResponse = (
  res: Response,
  response: Error | IComment[] | IComment | IUser[] | IUser | object | NonSensitiveUserData
): void => {
  if (response === Error.BAD_REQUEST) {
    res.status(404).send({
      status: 404,
      message: 'Bad Request.',
      data: []
    })
  } else if (response === Error.EMPTY_RESPONSE) {
    res.status(200).send({
      status: 200,
      message: 'Inexistent.',
      data: []
    })
  } else if (response === Error.EXISTING_RECORD) {
    res.status(404).send({
      status: 404,
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
