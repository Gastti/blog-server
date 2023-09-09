import { Schema, model } from 'mongoose'
import { IPost } from '../types'

const PostSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    content: { type: String },
    category: { type: String },
    tags: { type: [String] },
    url: { type: String },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: String }
  },
  {
    timestamps: true
  }
)

export const PostModel = model<IPost>('Post', PostSchema)
