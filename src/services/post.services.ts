import { Error } from '../enums'
import { PostModel } from '../models/post.schema'
import { UserModel } from '../models/user.schema'
import { EditPostEntry, IPost, NewPostEntry } from '../types'
import { handleExpiratedImage, verifyExpirationDate } from '../utils/image.utils'

export const getAllPosts = async (): Promise<IPost[] | Error> => {
  try {
    const postsImages: IPost[] = await PostModel.find({ isDeleted: false })
      .select('title')
      .populate({ path: 'image', select: 'expirationDate key' })

    if (postsImages == null) return Error.BAD_REQUEST

    for (const data of postsImages) {
      const { image } = data
      const isExpired = verifyExpirationDate(image.expirationDate)
      if (isExpired) await handleExpiratedImage(image.key)
    }

    const posts = await PostModel.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .select('title content image category tags url createdAt')
      .populate({ path: 'author', select: '-_id username firstname lastname avatar role' })
      .populate({ path: 'image', select: '-_id url' })

    return posts
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return Error.INTERNAL_ERROR
  }
}

export const getPostsByQuery = async (queryParams: any): Promise<IPost[] | null | Error> => {
  try {
    const title: string = queryParams.title ?? ''

    if (title !== null && title.length > 0) {
      const postsImages: IPost[] = await PostModel.find({
        $and: [
          { title: { $regex: new RegExp(title, 'i') } },
          { isDeleted: false }]
      })
        .select('title')
        .populate({ path: 'image', select: 'expirationDate key' })

      if (postsImages == null) return Error.BAD_REQUEST

      for (const data of postsImages) {
        const { image } = data
        const isExpired = verifyExpirationDate(image.expirationDate)
        if (isExpired) await handleExpiratedImage(image.key)
      }

      const posts: IPost[] = await PostModel.find({
        $and: [
          { title: { $regex: new RegExp(title, 'i') } },
          { isDeleted: false }]
      })
        .sort({ createdAt: -1 })
        .select('title content image category tags url createdAt')
        .populate({ path: 'author', select: '-_id username firstname lastname avatar role' })
        .populate({ path: 'image', select: '-_id url' })

      if (posts === null) return Error.BAD_REQUEST

      return posts
    }

    return null
  } catch (error) {
    console.log('Error in post.services.ts', error)
    return null
  }
}

export const getPostById = async (postId: string): Promise<IPost | null | Error> => {
  try {
    const postImage: IPost | null = await PostModel.findOne({
      $and: [
        { _id: postId },
        { isDeleted: false }
      ]
    })
      .select('title')
      .populate({ path: 'image', select: 'expirationDate key' })

    if (postImage == null) return Error.BAD_REQUEST

    const isExpired = verifyExpirationDate(postImage.image.expirationDate)
    if (isExpired) await handleExpiratedImage(postImage.image.key)

    const post: IPost | null = await PostModel.findOne({
      $and: [
        { _id: postId },
        { isDeleted: false }
      ]
    })
      .select('title content category tags url createdAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
      .populate({ path: 'image', select: '-_id url' })

    return post
  } catch (error) {
    console.log('Error in post.services.ts - getPostById', error)
    return null
  }
}

export const getPostByAuthor = async (username: string): Promise<IPost[] | Error> => {
  try {
    const user = await UserModel.findOne({ username })

    const postsImages: IPost[] = await PostModel.find({
      $and: [
        { author: { $eq: user?._id } },
        { isDeleted: false }
      ]
    })
      .select('title')
      .populate({ path: 'image', select: 'expirationDate key' })

    if (postsImages == null) return Error.BAD_REQUEST

    for (const data of postsImages) {
      const { image } = data
      const isExpired = verifyExpirationDate(image.expirationDate)
      if (isExpired) await handleExpiratedImage(image.key)
    }

    const posts = await PostModel.find({
      $and: [
        { author: { $eq: user?._id } },
        { isDeleted: false }
      ]
    })
      .select('title content category tags url createdAt')
      .populate({ path: 'author', select: 'username firstname lastname avatar role' })
      .populate({ path: 'image', select: 'url' })

    if (posts === null) return Error.BAD_REQUEST

    return posts
  } catch (error) {
    console.log('Error in post.services.ts - getPostByAuthor', error)
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
