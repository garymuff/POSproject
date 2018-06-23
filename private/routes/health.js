const express = require('express')
const router = express.Router()

router.get('/', (req,res) => res.send("Status: 200"))

module.exports = router