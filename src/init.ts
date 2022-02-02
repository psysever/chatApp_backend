import './db'
import dotenv from 'dotenv'
import app from './server'
dotenv.config()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
    enabledTransports: ['ws', 'wss'],
  },
})

io.on('connection', (socket: any) => {
  socket.on('user-send', function (data: any) {
    io.emit('broadcast', data)
  })
  socket.on('connect_error', (err: any) => {
    console.log(`connect_error due to ${err.message}`)
  })
  //   socket.on('joinroom', function (data: any) {
  //     socket.join('room1')
  //   })
  //   socket.on('room1-send', function (data: any) {
  //     io.to('room1').emit('broadcast', data) //to -> 특정한곳에만
  //   })
})
const PORT = process.env.PORT
const handleListening = () => console.log(`http://localhost:${PORT} 🚀`)

server.listen(PORT, handleListening)
