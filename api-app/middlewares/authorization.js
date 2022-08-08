const AUTH_SECRET_TOKEN = 'mysecrettoken';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || authHeader !== AUTH_SECRET_TOKEN) {
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
        })
    } else {
        next()
    }
}