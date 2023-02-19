const express = require('express');
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
 const { requiresAuth } = require('express-openid-connect');

const CONFIG = require('./config/config');
const connectToDb = require('./DB/mongoDB');
const logger = require('./logging/logger')
 const app = express();
 const auth0Middleware = require('./auth/auth0');

// connect to mongoDB
connectToDb()

//routes
const bookRouter = require('./routes/book.route')
const authorRouter = require('./routes/author.route')
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth0Middleware);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})




//middleware
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 // Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(helmet()) // security middleware

 app.get("/", (req, res) => {
    res.send('welcome to book store')
 })

 app.use('/api/v1/books', requiresAuth(), bookRouter)
 app.use('/api/v1/authors', requiresAuth(), authorRouter)

 // error handler middleware
 app.use((err, req, res, next) => {
   logger.error(err.message)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
 })

 //start server
app.listen(CONFIG.PORT, () => {
   logger.info(`server started on localhost:${CONFIG.PORT}`)
})