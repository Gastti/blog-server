import { Router } from 'express'
import { check, param } from 'express-validator'
import * as postControllers from '../controllers/post.controllers'
import { validateFields } from '../middlewares/validate'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import * as permissions from '../middlewares/permissions'

const router = Router()

router.get('/', [
  isAuthenticated,
  permissions.isWriter,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.getAllPosts)

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
  isAuthenticated,
  permissions.isWriter,
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
    .optional()
    .isString().withMessage('Must be type string.')
    .trim().escape(),
  check('tags')
    .optional()
    .isArray().withMessage('Must be an array.')
    .trim().escape(),
  isAuthenticated,
  permissions.isPostAutor,
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
  isAuthenticated,
  permissions.isPostAutor,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.deletePost)

export default router
