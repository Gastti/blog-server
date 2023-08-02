import { Router } from 'express'
import { check, param } from 'express-validator'
import * as postControllers from '../controllers/post.controllers'
import { validateFields } from '../middlewares/validate'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', postControllers.getAllPosts)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/find', postControllers.getPostsByQuery)

router.get('/:id', [
  param('id')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape()
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.getPostById)

router.post('/', [
  check(['title', 'category', 'content'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be type string.')
    .trim().escape(),
  check('tags')
    .notEmpty().withMessage('Required field.')
    .isArray().withMessage('Must be an array.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.addPost)

router.put('/:id', [
  param('id')
    .notEmpty().withMessage('Required field.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .isString().withMessage('Must be a string.')
    .trim().escape(),
  check(['title', 'category', 'content'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be type string.')
    .trim().escape(),
  check('tags')
    .notEmpty().withMessage('Required field.')
    .isArray().withMessage('Must be an array.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.editPost)

router.delete('/:id', [
  param('id')
    .notEmpty().withMessage('Required field.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .isString().withMessage('Must be a string.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.deletePost)

export default router
