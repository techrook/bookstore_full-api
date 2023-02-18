const authorModel = require("../models/author.model");

const getAllAuthors = (req, res) => {
    authorModel.find()
    .then(authors => {
        res.send(authors)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getAuthorById = (req, res) => {
    const id = req.params.id
    authorModel.findById(id)
        .then(author => {
            res.status(200).send(author)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

const addAuthor = (req, res) => {
    const author = req.body

    authorModel.create(author)
        .then(author => {
            res.status(201).send(author)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const updateAuthor = (req, res) => {
    const author = req.body
    const id = req.params.id
   
    authorModel.findByIdAndUpdate(id, author, { new: true })
        .then(author => {
            res.status(200).send(author)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const deleteAuthor = (req, res) => {
    const id = req.params.id
    authorModel.findByIdAndRemove(id)
        .then(author => {
            res.status(200).json({
                message : "author has been deleted",
                data : author
            })
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
}