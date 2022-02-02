/* middleware.js */

import { IUserInputDTO } from './interfaces/IUser'
import user from './models/user'

export const localsMiddleware = (req: any, res: any, next: any) => {
  res.locals.siteName = 'JackInfoApp'
  next()
}

export const checkDuplicateUsernameOrEmail = async (
  req: any,
  res: any,
  next: any,
) => {
  console.log(req.body)
  try {
    // Username
    if (req.body.email === '' || req.body.email === null) {
      console.log(`${req.body.email}asdoiasjdosid`)
      return res.json({
        message: 'Failed! no Email!',
      })
    }
    let existingEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    })
    console.log(existingEmail)
    if (existingEmail?.email === req.body.email) {
      return res.json({
        message: 'emailDupilcate',
      })
    }
    next()
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Username!',
    })
  }
}

export const protectorMiddleware = (req: any, res: any, next: any) => {
  if (req.session.loggedIn) {
    return next()
  } else {
    req.flash('error', 'Log in first.')
    return res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req: any, res: any, next: any) => {
  if (!req.session.loggedIn) {
    return next()
  } else {
    req.flash('error', 'Not authorized')
    return res.redirect('/')
  }
}
