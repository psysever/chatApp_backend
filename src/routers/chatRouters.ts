import {
  getChat,
  postChat,
  editChat,
  delChat,
  postChatMg,
  getChatMg,
  getChatUser,
} from './../controllers/chatControllers'

import express from 'express'

const chatRouter = express.Router()

chatRouter.post('/add', postChat)
chatRouter.get('/list', getChat)
chatRouter.post('/edit', editChat)
chatRouter.post('/del', delChat)
chatRouter.post('/message', postChatMg)
chatRouter.get('/soket', getChatUser)

export default chatRouter
