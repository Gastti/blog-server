import { Request, Response, NextFunction } from 'express'

const verifyAuthorizationHeader = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const authorizationHeader = req.header('Authorization')
  console.log(authorizationHeader)
  if (!((authorizationHeader?.startsWith('Bearer ')) ?? false)) {
    return res.status(401).json({ message: 'Unauthorizedddd' })
  }
  next()
  return undefined
}

export default verifyAuthorizationHeader
