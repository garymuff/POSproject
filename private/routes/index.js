var express = require('express')
var router = express.Router()

router.get('/', (req, res) => res.sendFile('login.html'));

module.exports = router