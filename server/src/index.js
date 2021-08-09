const express  = require('express')
const env      = require('dotenv')
const mongoose = require('mongoose')

const app = express()

// routes
const authRoutes     = require('./routes/auth')
const adminRoutes    = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes  = require('./routes/product')
const cartRoutes     = require('./routes/cart')

env.config()

// constants
const PORT              = process.env.PORT
const MONGO_DB_USER     = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE
const MONGODB_URL       = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.m9htn.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)


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

// mongodb connection
mongoose.connect(
    MONGODB_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log('Database connected')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))


