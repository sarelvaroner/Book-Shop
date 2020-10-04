const mongoose = require('mongoose')


const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})


publisherSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'publisher'
})


publisherSchema.virtual('authors', {
    ref: 'Authors',
    localField: '_id',
    foreignField: 'publisher'
})


const Publisher = mongoose.model('Publisher', publisherSchema)

module.exports = Publisher