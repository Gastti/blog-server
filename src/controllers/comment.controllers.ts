import { Request, Response } from 'express'
import * as commentServices from '../services/comment.services'
import { Error } from '../enums'
import { NewCommentEntry } from '../types'
// import { sendResponse } from '../utils/response.utils'

export const getAllComments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await commentServices.getAllComments()
    // sendResponse(res, response)
    if (response === Error.BAD_REQUEST) {
      res.status(404).send({
        status: 404,
        message: 'Bad Request.'
      })
    } else {
      res.status(200).send({
        status: 200,
        data: response
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params
    const response = await commentServices.getCommentsByPost(postId)

    if (response === Error.BAD_REQUEST) {
      res.status(404).send({
        status: 404,
        message: 'Bad Request.'
      })
    } else {
      res.status(200).send({
        status: 200,
        data: response
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body
    const { userId } = req.authenticatedUser
    const { postId } = req.params
    const commentData: NewCommentEntry = {
      content,
      authorId: userId,
      postId
    }

    const response = await commentServices.addComent(commentData)

    if (response === Error.BAD_REQUEST) {
      res.status(404).send({
        status: 404,
        message: 'Bad request.'
      })
    } else {
      res.status(200).send({
        status: 200,
        data: response
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}
