const cors = require('cors');

module.exports = cors({
    origin: process.env.APP_URL
})