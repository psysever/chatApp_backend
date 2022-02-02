import mongoose from 'mongoose'
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

const chatMessageSchema = new mongoose.Schema({
  parent: { type: Number, default: 0 },
  userId: { type: Number },
  chat: { type: String },
  date: { type: Date, default: Date.now },
})

chatMessageSchema.plugin(autoIncrement.plugin, {
  model: 'Message',
  field: '_id',
  startAt: 0, //시작
  increment: 1, // 증가
})

const message = mongoose.model('Message', chatMessageSchema)

export default message
