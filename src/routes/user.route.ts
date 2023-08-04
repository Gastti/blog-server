import { Router } from 'express'
import * as userControllers from '../controllers/user.controllers'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import * as permissions from '../middlewares/permissions'

const router = Router()

router.get('/', [
  isAuthenticated,
  permissions.isAdmin
],
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userControllers.getAllUsers)

export default router
