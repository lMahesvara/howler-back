import { Router } from 'express'
import {
  addUser,
  getUser,
  getUsersByUsername,
  resetPassword,
  updateUser,
} from '../controllers/user.controller.js'
import { addHashtag, getHashtags } from '../controllers/hashtag.controller.js'
import { getChats, getChat, read } from '../controllers/chat.controller.js'
import { addMessage, getMessages } from '../controllers/message.controller.js'
import { login } from '../controllers/auth.controller.js'
import { followUser, getFollowers, getFollowing, unfollowUser } from '../controllers/follow.controller.js'

import {
  addHowl,
  getHowlById,
  getHowls,
  getHowlsByHashtag,
  getHowlsByUserId,
  rehowl,
  replyHowl,
} from '../controllers/howl.controller.js'
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from '../controllers/follow.controller.js'
import {
  addNotification,
  getNotifications,
  readNotification,
} from '../controllers/notification.controller.js'

export const routes = Router()

routes.get('/users/:id', getUser)
routes.get('/users/username/:username', getUsersByUsername)
routes.post('/users', addUser)
routes.put('/users/:id', updateUser)
routes.put('/users/password/:id', resetPassword)

routes.get('/hashtags/:name', getHashtags)
routes.post('/hashtags', addHashtag)

routes.get('/chats/:idUser', getChats)
routes.get('/chats/:firstId/:secondId', getChat)
routes.put('/chats/read/:idChat/:idUser', read)

routes.get('/messages/:idChat', getMessages)
routes.post('/messages/:idChat', addMessage)
