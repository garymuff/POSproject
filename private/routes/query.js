const db = require('../config/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
	const sku = req.body.sku;
  	const sql = "SELECT sku, name, price, quantity FROM inventory WHERE sku =\'"+ sku +"\';" 
  	const query = await db.query(sql);
  	console.log(query.rows[0]);
  	res.send(query.rows[0]);
});

module.exports = router;