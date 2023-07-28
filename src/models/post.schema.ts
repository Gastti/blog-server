import { Schema, model } from 'mongoose'
import { IPost } from '../types'

const PostSchema: Schema = new Schema(
  {
    user_id: { type: Number },
    title: { type: String },
    content: { type: String },
    category: { type: String },
    tags: { type: [String] },
    url: { type: String }
  },
  {
    timestamps: true
  }
)

export const PostModel = model<IPost>('Post', PostSchema)
