import { Schema, model } from 'mongoose'
import { IPost } from '../types'

const PostSchema: Schema = new Schema(
  {
    userId: { type: String },
    title: { type: String },
    content: { type: String },
    category: { type: String },
    tags: { type: [String] },
    url: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const PostModel = model<IPost>('Post', PostSchema)
