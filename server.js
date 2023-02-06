const express = require('express');
const bodyParser = require('body-parser')

const CONFIG = require('./config/config');
const connectToDb = require('./DB/mongoDB');

 const app = express();

// connect to mongoDB
connectToDb()

//routes
const bookRouter = require('./routes/book.route')


//middleware
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

 app.get("/", (req, res) => {
    res.send('welcome to book store')
 })

 app.use('/books', bookRouter)

 // error handler middleware
 app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
 })

 //start server
app.listen(CONFIG.PORT, () => {
    console.log(`server started on localhost:${CONFIG.PORT}`)
})