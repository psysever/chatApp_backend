import express from 'express'
import userRouter from './routers/userRouter'
import generalErrorHandler from './errors/generalErrorHandler'
import boardRouter from './routers/boardRouters'
import cookieParser from 'cookie-parser'
import chatRouter from './routers/chatRouters'
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  }),
)
app.use('/', boardRouter)
app.use('/', userRouter)
app.use('/chat', chatRouter)
app.use(generalErrorHandler)

export default app
