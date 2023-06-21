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
import { addMessage, getMessages } from '../controllers/message.controller.js'
import { addHowl, getHowlById, getHowlsByHashtag, getHowlsByUserId } from '../controllers/howl.controller.js'

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

routes.get('/messages/:idChat', getMessages)
routes.post('/messages/:idChat', addMessage)

routes.get('/howls/:idHowl',getHowlById)
routes.get('/howls/user/:idUser',getHowlsByUserId)
routes.get('/howls/hashtag/:hashtag', getHowlsByHashtag)
routes.post('/howls', addHowl)