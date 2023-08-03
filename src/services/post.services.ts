import { PostModel } from '../models/post.schema'
import { IPost, NewPostEntry } from '../types'

export const getAllPosts = async (): Promise<IPost[] | null> => {
  try {
    const posts: IPost[] = await PostModel.find({ isDeleted: false })

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
        $and: [
          { title: { $regex: new RegExp(title, 'i') } },
          { isDeleted: false }]
      }).exec()
      if (posts.length > 0) return posts
    }

    if (tag !== null && tag.length > 0) {
      const lowerCasedTag = tag.toLowerCase()
      const posts = await PostModel.find({
        $and: [
          { tags: { $in: [lowerCasedTag] } },
          { isDeleted: false }
        ]
      })
      if (posts.length > 0) return posts
    }

    return null
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return null
  }
}

export const getPostById = async (postId: string): Promise<IPost | null> => {
  try {
    const post: IPost | null = await PostModel.findOne({
      $and: [
        { _id: postId },
        { isDeleted: false }
      ]
    })

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

export const editPost = async (postId: string, updatedData: NewPostEntry): Promise<IPost | null> => {
  try {
    const post = await PostModel.findOneAndUpdate({
      $and: [
        { _id: postId },
        { isDeleted: false }
      ]
    }, updatedData, { new: true })

    return post
  } catch (error) {
    console.log('Error in post.services.ts - editPost', error)
    return null
  }
}

export const deletePost = async (postId: string): Promise<IPost | null> => {
  try {
    const post = await PostModel.findOneAndUpdate({
      $and: [
        { _id: postId },
        { isDeleted: false }
      ]
    }, { isDeleted: true })

    return post
  } catch (error) {
    console.log('Error in post.services.ts - deletePost', error)
    return null
  }
}
