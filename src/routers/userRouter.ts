import express from 'express'
import { postJoin, postLogin } from '../controllers/userControllers'
import { checkDuplicateUsernameOrEmail } from '../middleware'
import routes from './routers'

const userRouter = express.Router()

// 한편, res.render()는 첫 번째 인자(필수)로 view, 두 번째 인자(옵션)로 locals를 받습니다.
userRouter.post(routes.login, postLogin)
userRouter.post(routes.join, [checkDuplicateUsernameOrEmail], postJoin)

export default userRouter
