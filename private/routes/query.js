const db = require('../config/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
	const sku = req.body.sku;
  	const sql = `SELECT sku, name, price, quantity FROM inventory WHERE sku ='${sku}';`; 
  	try{
		const query = await db.query(sql);
		res.send(query.rows[0])
  	} catch(err){
  		console.log("query.js", err);
  	}
});

module.exports = router;