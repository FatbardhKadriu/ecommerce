const express  = require('express')
const env      = require('dotenv')
const mongoose = require('mongoose')
const path     = require('path')
const cors     = require('cors')


const app = express()

// routes
const authRoutes         = require('./routes/auth')
const adminRoutes        = require('./routes/admin/auth')
const categoryRoutes     = require('./routes/category')
const productRoutes      = require('./routes/product')
const cartRoutes         = require('./routes/cart')
const initialDataRoutes  = require('./routes/admin/initialData')
const pageRoutes         = require('./routes/admin/page')
const addressRoutes      = require('./routes/address')
const orderRoutes        = require('./routes/order')
const adminOrderRoutes   = require('./routes/admin/order')
const adminProfileRoutes = require('./routes/admin/profile')
const userProfileRoutes  = require('./routes/profile')
const adminUsersRoutes   = require('./routes/admin/users')

env.config()

// constants
const PORT              = process.env.PORT
const MONGO_DB_USER     = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE
const MONGODB_URL       = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.m9htn.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'images/profiles/admin')))
app.use('/public', express.static(path.join(__dirname, 'images/profiles/user')))
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)
app.use('/api', pageRoutes)
app.use('/api', addressRoutes)
app.use('/api', orderRoutes)
app.use('/api', adminOrderRoutes)
app.use('/api', adminProfileRoutes)
app.use('/api', userProfileRoutes)
app.use('/api', adminUsersRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from Server'
    })
})

// mongodb connection
mongoose.connect(
    MONGODB_URL, 
    { 
        useNewUrlParser:    true, 
        useUnifiedTopology: true,
        useCreateIndex:     true,
        useFindAndModify:   false
    }
).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running: http://localhost:${PORT}`)
    })
})
.catch((err) => console.log(err))


