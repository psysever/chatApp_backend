import mongoose from 'mongoose'
import { Board, IUser } from '../interfaces/IUser'
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

const BoardSchema = new mongoose.Schema(
  {
    _id: { type: Number, default: 0 },
    userId: { type: Number },
    title: { type: String, required: true },
    contents: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
)

BoardSchema.plugin(autoIncrement.plugin, {
  model: 'Board',
  field: '_id',
  startAt: 0, //시작
  increment: 1, // 증가
})

export default mongoose.model<Board & mongoose.Document>('Board', BoardSchema)
