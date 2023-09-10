import { Request, Response, NextFunction } from 'express'

const checkImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if ((req.files == null) || !('image' in req.files)) {
    res.status(400).json({
      status: 400,
      message: 'No files were uploaded.'
    })
    return
  }
  next()
}

export default checkImage
