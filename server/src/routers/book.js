const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const Publisher = require('../models/publisher')
const auth = require('../middleware/auth')
const permission = require('../middleware/permission')
const router = new express.Router()


router.post('/books', auth, permission, async (req, res) => {
    try {
        const [firstName, lastName] = req.body.author.split(' ')
        const currentauthor = { firstName, lastName }
        const publisherName = { name: req.body.publisher }
        const condition = { upsert: true, new: true }
        const author = await Author.findOneAndUpdate(currentauthor, currentauthor, condition);
        const publisher = await Publisher.findOneAndUpdate(publisherName, publisherName, condition);
        const book = await new Book({ name: req.body.name, price: req.body.price, author: author._id, publisher: publisher._id })
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


// GET /tasks?limit=10&skip=20
router.get('/books', auth, async (req, res) => {
    const { search, skip, limit } = req.query
    const query = search ? { name: { $regex: search, $options: "i" } } : {}
    try {
        const books = await Book.find(query, { name: 1, price: 1 })
            .populate('author')
            .populate('publisher')
            .exec()

        res.send(books)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


router.patch('/books/:id', auth, permission, async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        const [firstName, lastName] = req.body.author.split(' ')
        const currentauthor = { firstName, lastName }
        const publisherName = { name: req.body.publisher }
        const condition = { upsert: true, new: true }
        const author = await Author.findOneAndUpdate(currentauthor, currentauthor, condition);
        const publisher = await Publisher.findOneAndUpdate(publisherName, publisherName, condition);

        if (!book) {
            return res.status(404).send()
        }
        book.author =  author
        book.publisher =  publisher
        book.name = req.body.name
        book.price = req.body.price
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/books/:id', auth, permission, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id })

        if (!book) {
            res.status(404).send()
        }
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router






