import { Router } from 'express'
import { check } from 'express-validator'
import * as postControllers from '../controllers/post.controllers'
import { validateFields } from '../middlewares/validate'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', postControllers.getAllPosts)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/find', postControllers.getPostsByQuery)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', postControllers.getPostById)

router.post('/', [
  check(['title', 'category', 'content'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be type string.')
    .trim()
    .escape(),
  check('tags')
    .notEmpty().withMessage('Required field.')
    .isArray().withMessage('Must be an array.')
    .trim()
    .escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.addPost)

export default router
