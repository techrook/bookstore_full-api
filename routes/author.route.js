const express = require('express')

const {addAuthorValidatorMiddleware, updateAuthorValidatorMiddleware} = require('../validator/author.validator')
const {getAllAuthors,getAuthorById, addAuthor, updateAuthor, deleteAuthor } = require('../controllers/author.controller')
const authorRouter = express.Router()

authorRouter.get('/',getAllAuthors )

authorRouter.get('/:id',getAuthorById )

authorRouter.post('/',addAuthorValidatorMiddleware, addAuthor)

authorRouter.put('/:id',updateAuthorValidatorMiddleware,  updateAuthor)

authorRouter.delete('/:id', deleteAuthor)


module.exports = authorRouter