const express = require('express')


const {addBookValidatorMiddleware, updateBookValidatorMiddleware} = require('../validator/book.validator');
const {getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/book.controller')
const bookRouter = express.Router()

bookRouter.get('/',getAllBooks )

bookRouter.get('/:id',getBookById )

bookRouter.post('/', addBookValidatorMiddleware, addBook)

bookRouter.put('/:id', updateBookValidatorMiddleware, updateBook)

bookRouter.delete('/:id', deleteBook)


module.exports = bookRouter


