import { Response } from 'express'
import { Error } from '../enums'
import { IComment, IUser } from '../types'

export const sendResponse = (
  res: Response,
  response: Error | IComment[] | IComment | IUser[] | IUser
): void => {
  if (response === Error.BAD_REQUEST) {
    res.status(404).send({
      status: 404,
      message: 'Bad Request.'
    })
  } else if (response === Error.EMPTY_RESPONSE) {
    res.status(200).send({
      status: 200,
      message: 'Inexistent.'
    })
  } else if (response === Error.EXISTING_RECORD) {
    res.status(404).send({
      status: 404,
      message: 'Email/Username already registered.'
    })
  } else {
    res.status(200).send({
      status: 200,
      message: 'Ok',
      data: response
    })
  }
}
