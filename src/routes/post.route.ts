import { Router } from 'express'
import * as postControllers from '../controllers/post.controllers'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', postControllers.getAllPosts)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/query', postControllers.getPostsByQuery)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', postControllers.getPostById)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', postControllers.addPost)

export default router
