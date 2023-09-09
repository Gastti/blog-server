import { Router } from 'express'
import { check, param } from 'express-validator'
import * as postControllers from '../controllers/post.controllers'
import { validateFields } from '../middlewares/validate'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import * as permissions from '../middlewares/permissions'

const router = Router()

// List all posts endpoint
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', postControllers.getAllPosts)

// List post by query endpoint
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/find', postControllers.getPostsByQuery)

// List post by id endpoint
router.get('/find/:id', [
  param('id')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape()
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.getPostById)

// List own posts endpoint
router.get('/me', [
  isAuthenticated,
  permissions.isWriter,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.getMyPosts)

// List post by author endpoint
router.get('/author/:id', [
  param('id')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape()
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.getMyPosts)

// Create a new post endpoint
router.post('/', [
  check(['title', 'category', 'content'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be type string.')
    .trim().escape(),
  check('tags')
    .notEmpty().withMessage('Required field.'), // .trim().escape()
  isAuthenticated,
  permissions.isWriter,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.addPost)

// Edit post endpoint
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
  permissions.isPostAuthor,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.editPost)

// Delete post endpoint
router.delete('/:id', [
  param('id')
    .notEmpty().withMessage('Required field.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .isString().withMessage('Must be a string.')
    .trim().escape(),
  isAuthenticated,
  permissions.isPostAuthor,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
postControllers.deletePost)

export default router
