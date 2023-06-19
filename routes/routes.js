import { Router } from 'express'
import {
  addUser,
  getUser,
  getUsersByUsername,
  resetPassword,
  updateUser,
} from '../controllers/user.controller.js'
import { 
  addHashtag, 
  getHashtag 
} from '../controllers/hashtag.controller.js'

export const routes = Router()

routes.get('/user/:id', getUser)
routes.get('/user/username/:username', getUsersByUsername)
routes.post('/user', addUser)
routes.put('/user/:id', updateUser)
routes.put('/user/password/:id', resetPassword)

routes.get('/hashtag/:name', getHashtag)
routes.post('/hashtag', addHashtag)