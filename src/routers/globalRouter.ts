import {
  postLogin,
  join,
  login,
  logout,
  postJoin,
} from './../controllers/userControllers'
/* globalRouter .js */

import express from 'express'
import routes from './routers'
const globalRouter = express.Router()

/* globalController.js */

globalRouter.get(routes.logout, logout)
globalRouter.post(routes.join, postJoin)
globalRouter.post(routes.login, postLogin)

export default globalRouter
