import { BoardInputDTO } from './../interfaces/IUser'
import board from '../models/border'
import { NextFunction, Request, Response } from 'express'

//게시물등록
export const postBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id, title, contents }: BoardInputDTO = req.body
  console.log(req)
  try {
    await board.create({
      userId: _id,
      title,
      contents,
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

//게시물
export const getBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const boards = await board.find({}).sort({ createdAt: 'desc' })
    res.json({
      data: boards,
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

//게시물 수정
export const editBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id, title, contents }: any = req.body
    await board.findByIdAndUpdate(_id, {
      title,
      contents,
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

//게시물 삭제
export const delBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id }: any = req.body
    const findBoard = await board.findByIdAndUpdate(_id)
    if (!findBoard) {
      res.json({
        message: 'notFindBoard',
      })
    }
    await board.findByIdAndDelete(_id)
    res.json({
      message: 'ok',
    })
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}

//게시물 검색
export const searchBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.query.value === 'string') {
      const searchInfo: any = [
        {
          $search: {
            index: 'titleSearch',
            text: {
              query: req.query.value,
              path: 'title', // 제목 날짜 찾고싶으면 ['제목','날짜']
            },
          },
        },
        { $sort: { _id: 1 } },
        // {$project : {title : 1, _id : 0, socre: {$meta: "searchScore"}}}   1이면 원하는정보를 가져오고 0이면 원하는 정보를 가져오지않는다.
        //{$limit : 10} 개수 제한
        // 정렬도가능
      ]
      const findBoard = await board.aggregate(searchInfo)
      //aggregate 검색조건을 여러개 입력할수있다 ([{날짜},{아이디},{뽑고십은거}]) 데이터 파이프라인
      if (!findBoard) {
        res.json({
          message: 'notFindBoard',
        })
      }
      res.json({
        data: findBoard,
      })
    }
  } catch (err) {
    res.json({
      message: 'fail',
    })
  }
}
