import { Router } from 'express'
import { check } from 'express-validator'
import * as authControllers from '../controllers/auth.controllers'
import { validateFields } from '../middlewares/validate'

const router = Router()

router.post('/signup', [
  check(['username', 'firstname', 'lastname'])
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isLength({ min: 3, max: 35 }).withMessage('Must have between 3 and 35 characters.')
    .trim().escape(),
  check('email')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isEmail({
      host_whitelist: ['gmail.com', 'outlook.com', 'outlook.es', 'hotmail.com', 'live.com']
    }).withMessage('Email must be a valid email (Gmail, Outlook, Hotmail or Live)')
    .isLength({ min: 8, max: 50 }).withMessage('Email must have between 8 and 50 characters.')
    .trim().escape(),
  check('password')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isLength({ min: 8, max: 30 }).withMessage('Password must have between 8 and 30 characters.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authControllers.signUp)

router.post('/signin', [
  check('email')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isEmail({
      host_whitelist: ['gmail.com', 'outlook.com', 'outlook.es', 'hotmail.com', 'live.com']
    }).withMessage('Email must be a valid email (Gmail, Outlook, Hotmail or Live)')
    .isLength({ min: 8, max: 50 }).withMessage('Email must have between 8 and 50 characters.')
    .trim().escape(),
  check('password')
    .notEmpty().withMessage('Required field.')
    .isString().withMessage('Must be a string.')
    .isLength({ min: 8, max: 30 }).withMessage('Password must have between 8 and 30 characters.')
    .trim().escape(),
  validateFields
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authControllers.signIn)

export default router
