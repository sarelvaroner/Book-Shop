
const { ROLE } = require('../const');


const permission = async (req, res, next) => {
    try {
        if (req.user.role !== ROLE.admin) {
            res.status(403).send({ error: 'user not allowed.' })
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'user not allowed.' })
    }
}

module.exports = permission