import { Request, Response } from 'express'
import * as postServices from '../services/post.services'
import * as imageServices from '../services/image.services'
import { Error } from '../enums'
import { EditPostEntry } from '../types'
import { sendResponse } from '../utils/response.utils'

export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postServices.getAllPosts()

    if (posts !== null) {
      res.status(200).send({
        status: 200,
        data: posts
      })
    } else {
      res.status(404).send({
        status: 404,
        message: 'Bad request or inexistent record.'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const getPostsByQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postServices.getPostsByQuery(req.query)

    if (posts !== null) {
      res.status(200).send({
        status: 200,
        data: posts
      })
    } else {
      res.status(404).send({
        status: 404,
        message: 'Bad request or inexistent record.'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const post = await postServices.getPostById(id)

    if (post !== null) {
      res.status(200).send({
        status: 200,
        post
      })
    } else {
      res.status(404).send({
        status: 404,
        message: 'Bad request or inexistent record.'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const getMyPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.authenticatedUser
    const response = await postServices.getPostByAuthor(userId)
    if (response === Error.INTERNAL_ERROR) {
      res.status(404).send({
        status: 404,
        message: 'Bad request.'
      })
    } else {
      res.status(200).send({
        status: 200,
        data: response
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const getPostsByAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params
    const response = await postServices.getPostByAuthor(username)
    sendResponse(res, response)
  } catch (error) {
    console.log('Error post.controllers - getPostsByAuthor', error)
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, category, tags } = req.body
    const { userId } = req.authenticatedUser
    const url = req.body.title
      .toLowerCase()
      .split(' ')
      .join('-')

    const splitedTags = tags.replace(/^"|"$/g, '').split(',')
    let imageUrl: string = ''
    if (
      req.files !== null &&
      req.files !== undefined &&
      'image' in req.files
    ) {
      const imageFile = req.files.image
      const uploadImage = await imageServices.saveImageOnDatabase(imageFile)
      imageUrl = uploadImage
    }

    const newPost = {
      url,
      title,
      content,
      category,
      tags: splitedTags,
      author: userId,
      image: imageUrl
    }

    const post = await postServices.addPost(newPost)

    res.status(200).send({
      status: 200,
      data: post
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 500,
      message: 'Internal error, contact an admin.'
    })
  }
}

export const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { title, content, category, tags } = req.body
    const newPostData: EditPostEntry = { title, content, category, tags }
    const post = await postServices.editPost(id, newPostData)

    if (post !== null) {
      res.status(200).send({
        status: 200,
        data: post
      })
    } else {
      res.status(404).send({
        status: 404,
        message: 'Bad request or inexistent record.'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const post = await postServices.deletePost(id)

    if (post !== null) {
      res.status(200).send({
        status: 200,
        data: post
      })
    } else {
      res.status(404).send({
        status: 404,
        message: 'Bad request or inexistent record.'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      data: error
    })
  }
}
