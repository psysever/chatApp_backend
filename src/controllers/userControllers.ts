import { IUserInputDTO } from './../interfaces/IUser'
import { check } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import user from '../models/user'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import errorGenerator from '../errors/errorGenerator'
dotenv.config()

/* userController.js */
const SECRET_KEY: any = process.env.SECRET_KEY
export const join = (req: any, res: any) => res.send('회원가입 화면!')
//로그인
export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password }: any = req.body
  console.log(req.body)
  try {
    let existingEmail = await user.findOne({ email })
    console.log(existingEmail)
    if (!existingEmail) {
      return res.json({
        message: 'noEmail',
      })
    }
    const passwordOk = await bcrypt.compare(password, existingEmail.password)
    if (!passwordOk) {
      return res.json({
        message: 'noMatchPassword',
      })
    }
    const token = await jwt.sign(
      {
        user: {
          email: email,
        },
      },
      SECRET_KEY,
    )

    res.json({ token, message: 'ok', existingEmail })
  } catch (e) {
    res.json({
      message: 'fail',
    })
  }
}
export const logout = (req: any, res: any) => {
  //TODO: 로그아웃 기능 구현
}
//회원가입
export const postJoin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password, password2 }: IUserInputDTO = req.body
  // check('userName', 'userName is required')
  //   .not()
  //   .isEmpty()
  //   .withMessage('이메일')
  // check('email', 'Please include a valid email').isEmpty()
  // check(
  //   'password',
  //   'Please enter a password with 6 or more characters',
  // ).isLength({ min: 4 })
  try {
    console.log(req.body)
    // if (email === '') {
    //   return res.status(404).send({ message: '이메일없음' })
    // }
    // if (password !== password2) {
    //   res.send({ errors: 'notMatchPassword' })
    // }
    // const exists = await user.exists({ $or: [{ username }, { email }] })
    // const exists = await user.exists({ email })
    // if (exists) {
    //   errorGenerator({ statusCode: 409, msg: 'duplicate' })
    // } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const createdUser = await user.create({
      email,
      username,
      password: hashedPassword,
    })
    const payload = {
      user: {
        email: createdUser.email,
      },
    }
    jwt.sign(payload, SECRET_KEY, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err
      res.json({ token, message: 'ok' })
    })
    // }
  } catch (err) {
    next(err)
  }
}
