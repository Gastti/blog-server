import { Response } from 'express'
import { Error } from '../enums'
import { IComment } from '../types'

export const sendResponse = (res: Response, response: Error | IComment[] | IComment): void => {
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
  } else {
    res.status(200).send({
      status: 200,
      message: 'Ok',
      data: response
    })
  }
}
