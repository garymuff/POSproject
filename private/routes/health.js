var express = require('express')
var router = express.Router()

router.get('/', (req,res) => res.send("Status: 200"))

module.exports = router