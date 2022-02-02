import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/IUser'
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)

const UserSchema = new mongoose.Schema(
  {
    _id: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    password2: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // chat: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Chat',
    //   },
    // ],
    // 관계맺기 레퍼런스 모델 relationship 서로 다른 데이터가 문맥상 연관성을 가지고 있을 때
  },
  { versionKey: false },
)

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: '_id',
  startAt: 0, //시작
  increment: 1, // 증가
})

const user = mongoose.model<IUser>('User', UserSchema)
export default user
