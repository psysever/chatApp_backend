import express from 'express'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import globalRouter from './routers/globalRouter'
import routes from './routers/routers'

export const app = express()

app.use(routes.users, userRouter)
app.use('/videos', videoRouter)
app.use(routes.home, globalRouter)
