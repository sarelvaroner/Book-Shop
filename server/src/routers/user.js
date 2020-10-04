const express = require('express')
const User = require('../models/user')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()     
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})


router.post('/users/newbook/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        req.user.books.push(book)
        await req.user.save()
        res.send({ book })
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/lastbook', auth, async (req, res) => {
    try {
        const bookId =  req.user.books[req.user.books.length - 1]._id
        const book = await Book.findOne({ _id: bookId })       
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router