import { Request, Response, NextFunction } from 'express'
import { Role } from '../enums'
import { PostModel } from '../models/post.schema'
import { CommentModel } from '../models/comment.schema'
import { UserModel } from '../models/user.schema'

export async function isAdmin (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userRole } = req.authenticatedUser
    if (userRole !== Role.Admin) {
      res.status(403).send({
        status: 403,
        message: 'Forbidden.'
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export async function isWriter (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userRole } = req.authenticatedUser
    if (userRole !== Role.Writer && userRole !== Role.Admin) {
      res.status(403).send({
        status: 403,
        message: 'Forbidden.'
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export async function isPostAuthor (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, userRole } = req.authenticatedUser
    const { id } = req.params

    const post = await PostModel.findOne({ _id: id })
    if (post === null) {
      res.status(404).send({
        status: 404,
        message: 'Non-existent post.'
      })
      return
    }

    if (post.author === userId || userRole === Role.Admin) {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: 'Forbidden.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export async function isCommentAuthor (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, userRole } = req.authenticatedUser
    const { commentId } = req.params

    const comment = await CommentModel.findOne({ _id: commentId })
    if (comment === null) {
      res.status(404).send({
        status: 404,
        message: 'Non-existent post.'
      })
      return
    }

    if (comment.author === userId || userRole === Role.Admin) {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: 'Forbidden.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export async function isOwner (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, userRole } = req.authenticatedUser
    const { userIdParam } = req.params

    const user = await UserModel.findOne({
      $and: [
        { _id: userIdParam },
        { isDeleted: false }
      ]
    })
    if (user === null) {
      res.status(404).send({
        status: 404,
        message: 'Non-existent user.'
      })
      return
    }

    if (user._id.toString() === userId || userRole === Role.Admin) {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: 'Forbidden.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}
