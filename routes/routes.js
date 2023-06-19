import { Router } from 'express'
import {
  addUser,
  getUser,
  getUsersByUsername,
  resetPassword,
  updateUser,
} from '../controllers/user.controller.js'

export const routes = Router()

routes.get('/user/:id', getUser)
routes.get('/user/username/:username', getUsersByUsername)
routes.post('/user', addUser)
routes.put('/user/:id', updateUser)
routes.put('/user/password/:id', resetPassword)
