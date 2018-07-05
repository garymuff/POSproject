const express = require('express');
const path = require('path');
const check = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

router.post('/', check, (req, res) => {
	res.redirect('home');
});

module.exports = router;