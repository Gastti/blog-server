import { Router } from 'express'
import * as commentControllers from '../controllers/comment.controllers'
import { check, param } from 'express-validator'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { validateFields } from '../middlewares/validate'
import * as permissions from '../middlewares/permissions'

const router = Router()

// List all comments endpoint
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', commentControllers.getAllComments)

// List all post comments
router.get('/:postId', [
  param('postId')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
commentControllers.getCommentsByPost)

// Create a new comment
router.post('/:postId', [
  check('content')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be an string.')
    .trim().escape(),
  param('postId')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  isAuthenticated,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
commentControllers.addComment)

// Edit comment by id
router.put('/:commentId', [
  check('content')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be an string.')
    .trim().escape(),
  param('commentId')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  isAuthenticated,
  permissions.isCommentAuthor,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
commentControllers.editComment)

// Delete comment by id
router.delete('/:commentId', [
  param('commentId')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  isAuthenticated,
  permissions.isCommentAuthor,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
commentControllers.deleteComment)

export default router
