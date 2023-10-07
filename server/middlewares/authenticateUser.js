require('dotenv/config');
const jwt = require('jsonwebtoken');

module.exports = async function authenticateUser(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        res.status(401).send({ message: `Unauthenticated!` });
    }
    try {
        const response = jwt.verify(token, process.env.SECRET_KEY);
        if (response) {
            req.user = response;
            next();
        } else {
            res.status(400).send({ message: `Token not found!` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
