const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/general';
const RSA_PRIVETE_KEY = process.env.RSA_PRIVETE_KEY || 'jbhngykgm87hjjhda7787987d';
const ROLE = { user: 'USER', admin: 'ADMIN' }

module.exports = {
    PORT,
    MONGO_URI,
    RSA_PRIVETE_KEY,
    ROLE
}