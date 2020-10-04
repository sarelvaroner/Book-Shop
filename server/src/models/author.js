const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})


authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})


authorSchema.virtual('publishers', {
    ref: 'Publisher',
    localField: '_id',
    foreignField: 'author'
})


const Author = mongoose.model('Author', authorSchema)


module.exports = Author 



