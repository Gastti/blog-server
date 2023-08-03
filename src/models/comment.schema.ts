import { Schema, model } from 'mongoose'
import { IComment } from '../types'

const CommentSchema: Schema = new Schema(
  {
    authorId: { type: String },
    content: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const CommentModel = model<IComment>('Comment', CommentSchema)
