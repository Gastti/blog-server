import { Error } from '../enums'
import { CommentModel } from '../models/comment.schema'
import { IComment, NewCommentEntry } from '../types'

export const getAllComments = async (): Promise<IComment[] | Error> => {
  try {
    const comments = await CommentModel.find()
    if (comments.length > 0) return comments
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - getAllComments', error)
    return Error.BAD_REQUEST
  }
}

export const getCommentsByPost = async (postId: string): Promise<IComment[] | Error> => {
  try {
    const comments = await CommentModel.find({ postId })
    if (comments.length > 0) return comments
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - getCommentsByPost', error)
    return Error.BAD_REQUEST
  }
}

export const addComent = async (commentData: NewCommentEntry): Promise<IComment | Error> => {
  try {
    const comment = await CommentModel.create(commentData)
    if (comment !== null) return comment
    else return Error.BAD_REQUEST
  } catch (error) {
    console.log('Error in comment.services.ts - addComment', error)
    return Error.BAD_REQUEST
  }
}
