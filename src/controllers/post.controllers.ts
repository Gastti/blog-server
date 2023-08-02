import { Request, Response } from 'express'
import * as postServices from '../services/post.services'

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
    res.status(400).send({
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
    res.status(400).send({
      status: 500,
      data: error
    })
  }
}

export const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, category, tags } = req.body
    const url = req.body.title.toLowerCase().split(' ').join('-')

    const newPost = {
      url,
      title,
      content,
      category,
      tags
    }

    const post = await postServices.addPost(newPost)
    res.status(200).send({
      status: 200,
      data: post
    })
  } catch (error) {
    res.status(400).send({
      status: 500,
      data: error
    })
  }
}

export const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const post = await postServices.editPost(id, req.body)

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
    res.status(400).send({
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

  }
}
