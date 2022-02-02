import mongoose from 'mongoose'
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

const chatSchema = new mongoose.Schema({
  _id: { type: Number, default: 0 },
  userId: { type: Number },
  userNo: { type: Number },
  title: { type: String },
  //   owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  member: { type: Array },
  createdAt: { type: Date, default: Date.now },
})

chatSchema.plugin(autoIncrement.plugin, {
  model: 'Chat',
  field: '_id',
  startAt: 0, //시작
  increment: 1, // 증가
})

const chat = mongoose.model('Chat', chatSchema)

export default chat
