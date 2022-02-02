import {
  delBoard,
  editBoard,
  getBoard,
  postBoard,
  searchBoard,
} from './../controllers/boardControllers'
import { checkDuplicateUsernameOrEmail } from '../middleware'
import { postLogin, logout, postJoin } from '../controllers/userControllers'
/* globalRouter .js */
import express from 'express'
const boardRouter = express.Router()

/* globalController.js */

boardRouter.post('/board', postBoard)
boardRouter.get('/board_list', getBoard)
boardRouter.post('/editboard', editBoard)
boardRouter.post('/delboard', delBoard)
boardRouter.get('/searchboard', searchBoard)

export default boardRouter
