import { Router } from 'express'
import {
  addUser,
  getUser,
  getUsersByUsername,
  resetPassword,
  updateUser,
} from '../controllers/user.controller.js'
import { addHashtag, getHashtag } from '../controllers/hashtag.controller.js'
import { getChats, getChat, read } from '../controllers/chat.controller.js'

export const routes = Router()

routes.get('/users/:id', getUser)
routes.get('/users/username/:username', getUsersByUsername)
routes.post('/users', addUser)
routes.put('/users/:id', updateUser)
routes.put('/users/password/:id', resetPassword)

routes.get('/hashtags/:name', getHashtag)
routes.post('/hashtags', addHashtag)

routes.get('/chats/:idUser', getChats)
routes.get('/chats/:firstId/:secondId', getChat)
routes.put('/chats/read/:idChat/:idUser', read)