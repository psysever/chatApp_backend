import express from 'express'

const userRouter = express.Router()
export const join = (req:any, res:any) => res.render("join", {pageTitle: "Join"})
// 한편, res.render()는 첫 번째 인자(필수)로 view, 두 번째 인자(옵션)로 locals를 받습니다.

export default userRouter
