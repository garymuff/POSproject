const db = require('../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.sendFile('login.html'));
router.get('/success', (req, res) => {
	const message = req._parsedOriginalUrl.query;
	if(message === "authorized"){
		res.sendFile(__dirname + '/public/index.html');
	} else {
		res.send("unauthorized");
	}
});
router.get('/error', (req, res) => res.sendFile(__dirname + '/public/login.html'));
router.post('/query', async (req, res) => {
	const sku = req.body.sku;
	const sql = "SELECT sku, name, price, quantity FROM inventory WHERE sku =\'"+ sku +"\';" 
	const query = await db.query(sql);
	console.log(query.rows[0]);
	res.send(query.rows[0]);
});

module.exports = router