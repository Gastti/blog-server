import { Request, Response } from 'express'
import * as commentServices from '../services/comment.services'
import { NewCommentEntry } from '../types'
import { sendResponse } from '../utils/response.utils'

export const getAllComments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await commentServices.getAllComments()
    sendResponse(res, response)
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
    sendResponse(res, response)
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

    const response = await commentServices.addComment(commentData)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const editComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params
    const { content } = req.body
    const response = await commentServices.editComment(commentId, content)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params
    const response = await commentServices.deleteComment(commentId)
    sendResponse(res, response)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Internal error, try again or contact an admin.'
    })
  }
}
