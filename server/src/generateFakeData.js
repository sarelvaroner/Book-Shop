
const User = require('./models/user')
const Aothor = require('./models/author')
const Publisher = require('./models/publisher')
const Book = require('./models/book')
const { ROLE } = require('./const')







const generaetUsers = async (numberOfUsers, books) => {




    // if (await User.countDocuments({}) > 60) return
    // const users = Array(numberOfUsers).fill(null).map((user, userIndex) => {
    //     const book = books[Math.floor(Math.random() * (books.length - 1))]._id
    //     return {
    //         firstName: `${userIndex} firstName`,
    //         lastName: `${userIndex} lastName`,
    //         email: `${956514641 * Math.floor((Math.random() * 100000))}@gmail.com`,
    //         password: (userIndex + 1) * 99999999,
    //         tokens: [{ token: `ubu6rb6rbi6ub67rb6nb67br67br67br67${userIndex * Math.floor((Math.random() * 100))}` }],
    //         role: ROLE.user,
    //         books: [{ book }]
    //     }
    // })

    // return Promise.all(users.map(newUser => {
    //     console.log(newUser.email, newUser.password)
    //     const user = new User(newUser)
    //     return user.save()
    // })).then(savedUsers => savedUsers.map((_) => _.generateAuthToken()))
}


const generaeAuthers = async (numberOfAothors) => {

    const aothors = Array(numberOfAothors).fill(null).map((aothors, aothorIndex) => {
        return {
            firstName: `${aothorIndex} firstName`,
            lastName: `${aothorIndex} lastName`,
            books: []
        }
    })
    return await Aothor.insertMany(aothors)
}


const generaePublishers = async (numberOfPublishers) => {
    const publishers = Array(numberOfPublishers).fill(null).map((publishers, publisherIndex) => {
        return {
            name: `${publisherIndex} name`,
            books: [],
            authors: []
        }
    })
    return await Publisher.insertMany(publishers)
}


const generaeBooks = async (numberOfBooks, authors, publishers) => {
    if (await Book.countDocuments({}) > 200) return

    const books = Array(numberOfBooks).fill(null).map((_, bookIndex) => {
        const author = authors[Math.floor(Math.random() * (authors.length - 1))]._id
        const publisher = publishers[Math.floor(Math.random() * (publishers.length - 1))]._id
        return {
            name: `${bookIndex} name`,
            price: bookIndex,
            isAvailable: true,
            author,
            publisher,
        }
    })
    return await Book.insertMany(books)
}





const fakeData = async () => {
    try {
        // const authors = await generaeAuthers(20)
        // const publishers = await generaePublishers(20)
        // const books = await generaeBooks(20, authors, publishers)
        // const users = await generaetUsers(20, books)


        const users = await generaetUsers()
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = fakeData

