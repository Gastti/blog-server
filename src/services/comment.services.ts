import { Error } from '../enums'
import { CommentModel } from '../models/comment.schema'
import { IComment, NewCommentEntry } from '../types'

export const getAllComments = async (): Promise<IComment[] | Error> => {
  try {
    const comments = await CommentModel.find({ isDeleted: false })
      .select('content createdAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
    if (comments.length > 0) return comments
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - getAllComments', error)
    return Error.BAD_REQUEST
  }
}

export const getCommentsByPost = async (postId: string): Promise<IComment[] | Error> => {
  try {
    const comments = await CommentModel.find({
      $and: [
        { postId },
        { isDeleted: false }
      ]
    }).populate({ path: 'author', select: 'username firstname lastname avatar role' })
    if (comments.length > 0) return comments
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - getCommentsByPost', error)
    return Error.BAD_REQUEST
  }
}

export const addComment = async (commentData: NewCommentEntry): Promise<IComment | Error> => {
  try {
    const comment = await CommentModel.create(commentData)
    if (comment !== null) return comment
    else return Error.BAD_REQUEST
  } catch (error) {
    console.log('Error in comment.services.ts - addComment', error)
    return Error.BAD_REQUEST
  }
}

export const editComment = async (commentId: string, content: string): Promise<IComment | Error> => {
  try {
    const comment = await CommentModel.findOneAndUpdate({
      $and: [
        { _id: commentId },
        { isDeleted: false }
      ]
    }, { content }, { new: true })
      .select('content updatedAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
    if (comment !== null) return comment
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - editComment', error)
    return Error.BAD_REQUEST
  }
}

export const deleteComment = async (commentId: string): Promise<IComment | Error> => {
  try {
    const comment = await CommentModel.findOneAndUpdate({
      $and: [
        { _id: commentId },
        { isDeleted: false }
      ]
    }, { isDeleted: true }, { new: true })
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
    if (comment !== null) return comment
    else return Error.EMPTY_RESPONSE
  } catch (error) {
    console.log('Error in comment.services.ts - deleteComment', error)
    return Error.BAD_REQUEST
  }
}
