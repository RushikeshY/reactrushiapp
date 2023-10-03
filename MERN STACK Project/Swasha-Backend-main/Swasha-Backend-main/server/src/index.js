const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(errorMiddleware)
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost',
      'http://0.0.0.0:3000',
      'http://127.0.0.1:3000',
      'http://10.10.10.146:3000',
      'http://192.168.46.242:3000',
      'http://chinmayjain.live:3000',
      'http://chinmayjain.live',
      'http://swasha.chinmayjain.live',
    ],
    credentials: true,
  })
)

// Route Imports
const product = require('./routes/productRoute')
const category = require('./routes/categoryRoute')
const subcategory = require('./routes/subcategoryRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const address = require('./routes/addressRoute')
const wishlist = require('./routes/wishlistRoute')
const cart = require('./routes/cartRoute')
const payment = require('./routes/paymentRoute')
const contactUs = require('./routes/contactusRoute')
const BulkOrder = require('./routes/bulkOrderRouter')
const delivery = require('./routes/deliveryRoute')
const returnOrder = require('./routes/returnRoute')

app.use('/api/v1', product)
app.use('/api/v1', category)
app.use('/api/v1', subcategory)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', address)
app.use('/api/v1', wishlist)
app.use('/api/v1', cart)
app.use('/api/v1', payment)
app.use('/api/v1', contactUs)
app.use('/api/v1', BulkOrder)
app.use('/api/v1', delivery)
app.use('/api/v1', returnOrder)
app.use('/static', express.static('static'))
app.use('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/static/index.html'))
})

module.exports = app
