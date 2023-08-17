import { Schema, model } from 'mongoose'
import { IComment } from '../types'

const CommentSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: String },
    content: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const CommentModel = model<IComment>('Comment', CommentSchema)
