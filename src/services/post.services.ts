// import { PostEntry } from '../types'
import { PostModel } from '../models/post.schema'
import { IPost, NewPostEntry } from '../types'

export const getAllPosts = async (): Promise<IPost[]> => {
  const posts = await PostModel.find()
  return posts
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  const post = await PostModel.findById(id)
  return post
}

export const addPost = async (newPostEntry: NewPostEntry): Promise<IPost> => {
  const post = await PostModel.create(newPostEntry)
  return post
}
