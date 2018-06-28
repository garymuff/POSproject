const db = require('../config/db');
const express = require('express');
const router = express.Router();

router.post('/sku', async (req,res) => {
	const sku = req.body.sku;
  	const sql = `SELECT * FROM inventory WHERE sku ='${sku}';`; 
  	try{
		const query = await db.query(sql);
		res.send(query.rows[0])
  	} catch(err){
  		console.log("query.js", err);
  	}
});

router.post('/inventory', async (req,res) => {
  	const sql = `SELECT * FROM inventory;`; 
  	try{
		const query = await db.query(sql);
		res.send(query.rows)
  	} catch(err){
  		console.log("query.js", err);
  	}
});

module.exports = router;