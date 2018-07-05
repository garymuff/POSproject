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
  		res.status(400);
      res.send('Cannot get SKU. Database error.');
  	}
});

router.post('/inventory', async (req,res) => {
  	const sql = `SELECT * FROM inventory;`; 
  	try{
  		const query = await db.query(sql);
  		res.send(query.rows)
  	} catch(err){
  		res.status(400);
      res.send('Cannot get inventory. Database error.');
  	}
});

router.post('/orders', async (req,res) => {
    const sql = `SELECT * FROM orders;`; 
    try{
      const query = await db.query(sql);
      res.send(query.rows)
    } catch(err){
      res.status(400);
      res.send('Cannot get orders. Database error.');
    }
});

router.post('/addOrder', async (req,res) => {
    const price = req.body;
    console.log("PRICE: ", price.total);
    const sql = `INSERT INTO orders VALUES(NEXTVAL('orders_id_seq'), NOW(), '${price.total}');`; 
    try{
      const query = await db.query(sql);
      res.send(query.rows)
    } catch(err){
      res.status(400);
      res.send('Cannot add order. Database error.');
      console.log(err);
    }
});

router.post('/add', async (req,res) => {
    const item = req.body;
    const sql = `INSERT INTO inventory VALUES('${item.sku}', '${item.name}', '${item.price}', '${item.quantity}');`; 
    try{
      const query = await db.query(sql);
      res.send(query.rows)
    } catch(err){
      res.status(400);
      res.send('Cannot add item. SKU already in use.');
    }
});

router.post('/remove', async (req,res) => {
    const item = req.body;
    const sql = `DELETE FROM inventory WHERE sku = ${item.sku};`; 
    try{
      const query = await db.query(sql);
      res.send(query.rows)
    } catch(err){
      res.status(400);
      res.send('Cannot remove item. Contact server administrator.');
    }
});

module.exports = router;