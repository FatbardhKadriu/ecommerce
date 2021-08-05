const express  = require('express')
const env      = require('dotenv')
const mongoose = require('mongoose')

const app = express()

// routes
const userRoutes = require('./routes/user');

env.config()

// constants
const PORT              = process.env.PORT
const MONGO_DB_USER     = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE
const MONGODB_URL       = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.m9htn.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`

// mongodb connection
mongoose.connect(
    MONGODB_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => console.log('Database connected'))

app.use(express.json())
app.use('/api', userRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from Server'
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})