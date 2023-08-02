import { PostModel } from '../models/post.schema'
import { IPost, NewPostEntry } from '../types'

export const getAllPosts = async (): Promise<IPost[] | null> => {
  try {
    const posts: IPost[] = await PostModel.find()

    if (posts == null) return null

    return posts
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return null
  }
}

export const getPostsByQuery = async (queryParams: any): Promise<IPost[] | null> => {
  try {
    const tag: string = queryParams.tag ?? ''
    const title: string = queryParams.title ?? ''

    if (title !== null && title.length > 0) {
      const posts: IPost[] = await PostModel.find({
        title: { $regex: new RegExp(title, 'i') }
      })
      if (posts.length > 0) return posts
    }

    if (tag !== null && tag.length > 0) {
      const lowerCasedTag = tag.toLowerCase()
      const posts = await PostModel.find({
        tags: { $in: [lowerCasedTag] }
      })
      if (posts.length > 0) return posts
    }

    return null
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return null
  }
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  try {
    const post: IPost | null = await PostModel.findById(id)

    if (post == null) return null

    return post
  } catch (error) {
    console.log('Error in post.services.ts - getPostById', error)
    return null
  }
}

export const addPost = async (newPostEntry: NewPostEntry): Promise<IPost | null> => {
  try {
    const post = await PostModel.create(newPostEntry)
    return post
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return null
  }
}
