import { PostModel } from '../models/post.schema'
import { IPost, NewPostEntry } from '../types'

export const getAllPosts = async (): Promise<IPost[] | undefined> => {
  try {
    const posts = await PostModel.find()
    return posts
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return undefined
  }
}

export const getPostsByQuery = async (queryParams: any): Promise<IPost[] | undefined> => {
  try {
    console.log(queryParams)
    const { title, tag } = queryParams
    if (title.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const posts = await PostModel.find({ title: `/${title}/i` })
      return posts
    }

    if (tag.length !== 0) {
      const posts = await PostModel.find()
      return posts
    }

    return []
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return undefined
  }
}

export const getPostById = async (id: string): Promise<IPost | null | undefined> => {
  try {
    const post = await PostModel.findById(id)
    return post
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return undefined
  }
}

export const addPost = async (newPostEntry: NewPostEntry): Promise<IPost | undefined> => {
  try {
    const post = await PostModel.create(newPostEntry)
    return post
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return undefined
  }
}
