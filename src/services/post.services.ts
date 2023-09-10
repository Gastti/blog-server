import { Error } from '../enums'
import { PostModel } from '../models/post.schema'
import { EditPostEntry, IPost, NewPostEntry } from '../types'
import * as imageServices from './image.services'

export const getAllPosts = async (): Promise<IPost[] | null> => {
  try {
    const posts: IPost[] = await PostModel.find({ isDeleted: false })
      .select('title content image category tags url createdAt')
      .populate({ path: 'author', select: '-_id username firstname lastname avatar role' })
      .populate({ path: 'image', select: 'url expirationDate key' })

    if (posts == null) return null

    const currentDate = new Date()
    for (const post of posts) {
      const expirationDate = new Date(post.image.expirationDate)
      if (currentDate > expirationDate) {
        const key = post.image.key
        console.log('expired')
        await imageServices.updateImageUrlOnDatabase(key)
      }
    }

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
      })
        .select('title content category tags url createdAt')
        .populate({ path: 'author', select: 'username firstname lastname avatar role' })
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
        .select('title content category tags url createdAt')
        .populate({ path: 'author', select: 'username firstname lastname avatar role' })
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
      .select('title content category tags url createdAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })

    if (post == null) return null

    return post
  } catch (error) {
    console.log('Error in post.services.ts - getPostById', error)
    return null
  }
}

export const getPostByAuthor = async (userId: string): Promise<IPost[] | Error> => {
  try {
    const posts = await PostModel.find({ userId })
      .select('title content category tags url createdAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
    return posts
  } catch (error) {
    console.log('Error in post.services.ts - getPostById', error)
    return Error.INTERNAL_ERROR
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

export const editPost = async (postId: string, updatedData: EditPostEntry): Promise<IPost | null> => {
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
