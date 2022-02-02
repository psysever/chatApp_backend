import { BoardInputDTO } from '../interfaces/IUser'

import { NextFunction, Request, Response } from 'express'
import chat from '../models/chat'
import message from '../models/chatMessage'
import user from '../models/user'

//게시물등록
export const postChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const chatInfo = {
    title: req.body.title,
    member: [req.body.userNo, req.body.userId],
  }
  console.log(req.body)
  try {
    await chat.create(chatInfo)
    res.json({
      message: 'ok',
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

//채팅방
export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chatRooms = await chat
      .find({ member: req.query.value })
      .sort({ createdAt: 'desc' })
    res.json({
      data: chatRooms,
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

////채팅방수정
export const editChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id, title, contents }: any = req.body
    await chat.findByIdAndUpdate(_id, {
      title,
    })
    res.json({
      message: 'ok',
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

////채팅방삭제
export const delChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id }: any = req.body
    const findBoard = await chat.findByIdAndUpdate(_id)
    if (!findBoard) {
      res.json({
        message: 'notFindBoard',
      })
    }
    await chat.findByIdAndDelete(_id)
    res.json({
      message: 'ok',
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

//채팅방메세지
export const postChatMg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const chatInfo = {
    parent: req.body.parent,
    userId: req.body.userId,
    chat: req.body.chat,
  }
  console.log(req.body)
  try {
    await message.create(chatInfo)
    res.json({
      message: 'ok',
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

//채팅실시간 서버사이드 이벤트 헤더를 밑에처럼 수정하면 여러번 응답이 가능하다.
//url파라메터로 받아오기
export const getChatMg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  })
  console.log(req)
  const findChatMg = await message.find({ parent: req.params.parent })
  res.write('envent: test\n')
  res.write(`data: ${JSON.stringify(findChatMg)}` + '\n\n') // event: test\n event:보낼데이터이름\n data: 보낼데이터\n\n //무조건 문자만 가능
  //JSON은 오브젝트나 어레이세 "" JSON 형식
}

//유저정보보내주기
export const getChatUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.query.value)
  try {
    const chatUser = await user.find({ _id: req.query.value })
    res.json({
      data: chatUser,
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}
