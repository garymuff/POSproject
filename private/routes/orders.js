const express = require('express');
const path = require('path');
const check = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

router.get('/', check, (req, res) => {res.sendFile(path.join(__dirname, '../../private/orders.html'))});

module.exports = router;