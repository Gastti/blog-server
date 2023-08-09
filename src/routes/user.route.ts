import { Router } from 'express'
import * as userControllers from '../controllers/user.controllers'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import * as permissions from '../middlewares/permissions'
import { validateFields } from '../middlewares/validate'
import { check, param } from 'express-validator'

const router = Router()

router.get('/', [
  isAuthenticated,
  permissions.isAdmin
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.getAllUsers)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:userId', userControllers.getUserData)

// Get my user data
router.get('/me', [
  isAuthenticated,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.getMyUserData)

router.put('/edit/:userIdParam', [
  check(['username', 'firstname', 'lastname'])
    .optional()
    .isString().withMessage('Must be a string.')
    .isLength({ min: 3, max: 35 }).withMessage('Must have between 3 and 35 characters.')
    .trim().escape(),
  check('biography')
    .optional()
    .isString().withMessage('Must be a string.')
    .isLength({ min: 0, max: 255 }).withMessage('Must have max 255 characters.')
    .trim().escape(),
  param('userIdParam')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  isAuthenticated,
  permissions.isOwner,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.editUser)

router.put('/changepassword', [
  check(['oldPassword', 'newPassword'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isLength({ min: 8, max: 30 }).withMessage('Password must have between 8 and 30 characters.')
    .trim().escape(),
  isAuthenticated,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.changeUserPassword)

router.delete('/delete/:userId', [
  param('userId')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isMongoId().withMessage('Must be a valid mongo id.')
    .trim().escape(),
  isAuthenticated,
  permissions.isOwner,
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.deleteUser)

export default router
