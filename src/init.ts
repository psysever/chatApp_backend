import { app } from '../src/server'

const PORT = 8080
const handleListening = () => console.log(`http://localhost:${PORT} 🚀`)

app.listen(PORT, handleListening)
