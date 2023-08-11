import { Schema, model } from 'mongoose'
import { IComment } from '../types'

const CommentSchema: Schema = new Schema(
  {
    author: { type: String },
    postId: { type: String },
    content: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const CommentModel = model<IComment>('Comment', CommentSchema)
