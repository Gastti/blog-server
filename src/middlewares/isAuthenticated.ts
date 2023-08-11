import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.schema'
import { ITokenData } from '../types'

const ACCESS_JWT_SECRET_KEY: string | undefined = process.env.ACCESS_JWT_SECRET_KEY

export async function isAuthenticated (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let token = req.header('Authorization')
    if (token == null) {
      res.status(401).send({
        status: 401,
        message: 'Authorization Required.'
      })
      return
    }
    token = token.split(' ')[1]
    if (ACCESS_JWT_SECRET_KEY === undefined) {
      res.status(500).send({
        status: 500,
        message: 'Internal error, contact an admin.'
      })
      return
    }
    const tokenData = jwt.verify(token, ACCESS_JWT_SECRET_KEY) as ITokenData
    const userId: string = tokenData.userId
    const user = await UserModel.findOne({ _id: userId })
    if (user == null) {
      res.status(500).send({
        status: 500,
        message: 'Token not valid.'
      })
      return
    }

    req.authenticatedUser = { userId: tokenData.userId, userRole: tokenData.userRole }

    next()
  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}
