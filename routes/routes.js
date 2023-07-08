import { Router } from 'express'
import {
  addUser,
  getUser,
  getUserByUsername,
  getUsersByUsername,
  resetPassword,
  updateUser,
} from '../controllers/user.controller.js'
import { addHashtag, getHashtags } from '../controllers/hashtag.controller.js'
import { getChats, getChat, read } from '../controllers/chat.controller.js'
import { addMessage, getMessages } from '../controllers/message.controller.js'
import { externalLogin, login } from '../controllers/auth.controller.js'

import {
  addHowl,
  getHowlById,
  getHowls,
  getHowlsByHashtag,
  getHowlsByUserId,
  rehowl,
  replyHowl,
  likeHowl,
  dislikeHowl,
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
routes.get('/users/un/:username', getUserByUsername)
routes.post('/users', addUser)
routes.patch('/users/:id', updateUser)
routes.patch('/users/password/:id', resetPassword)

routes.get('/hashtags/:name', getHashtags)
routes.post('/hashtags', addHashtag)

routes.get('/chats/:idUser', getChats)
routes.get('/chats/:firstId/:secondId', getChat)
routes.put('/chats/read/:idChat/:idUser', read)

routes.get('/messages/:idChat', getMessages)
routes.post('/messages/:idChat', addMessage)

routes.patch('/follow/:idUserFollow/:idUser', followUser)
routes.get('/follow/followers/:idUser', getFollowers)
routes.get('/follow/following/:idUser', getFollowing)
routes.patch('/follow/unfollow/:idUserUnfollow/:idUser', unfollowUser)

routes.post('/auth/login', login)
routes.post('/auth/login/external', externalLogin)

routes.get('/howls/:idHowl', getHowlById)
routes.get('/howls/user/:idUser', getHowlsByUserId)
routes.get('/howls/hashtag/:idHashtag', getHowlsByHashtag)
routes.post('/howls', addHowl)
routes.get('/howls', getHowls)
routes.patch('/howls/reply/:idHowl', replyHowl)
routes.patch('/howls/rehowl/:idHowl', rehowl)
routes.patch('/howls/like/:idHowl/:idUser', likeHowl)
routes.patch('/howls/dislike/:idHowl/:idUser', dislikeHowl)

routes.post('/notifications', addNotification)
routes.get('/notifications/:userTo', getNotifications)
routes.patch('/notifications/read/:id', readNotification)
