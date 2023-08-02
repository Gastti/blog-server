import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export function validateFields (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
  return undefined
}
