import mongoose, { ConnectOptions } from 'mongoose'

mongoose.connect(
  'psysever:1234@localhost:27017',

  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
)

const db = mongoose.connection

const handleOpen = () => console.log('✅ Connected to DB')

const handleError = () => console.log('❌ Error on DB Connection: ${error}')

db.once('open', handleOpen)

db.on('error', handleError)
