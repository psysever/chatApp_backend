import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL: any = process.env.MONGO_URL

mongoose.connect(MONGO_URL)

const db = mongoose.connection

const handleOpen = () => console.log('✅ Connected to DB')

const handleError = () => console.log('❌ Error on DB Connection: ${error}')

db.once('open', handleOpen)

db.on('error', handleError)
