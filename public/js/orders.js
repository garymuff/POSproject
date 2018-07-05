window.onload = async function(){
	refreshOrders();
}

async function refreshOrders(){
	const orders = await getOrdersFromDatabase();
	console.log(orders);
	document.getElementById('orderlist').innerHTML = ``;
	if(orders.length !== 0){
		for(var i = 0; i < orders.length; i++){
			const order = orders[i];
			const id = order.id;
			document.getElementById('orderlist').innerHTML += `<div class="order"><div class="id">${order.id}</div><div class="date">${order.datetime}</div><div class="total">${order.price}</div></div>`;
		}
	} else {
		//no order found error
		document.getElementById('orderlist').innerHTML = `<div>Orders contains no items<br><img class="emptyInventory" src="../img/core/outofstock.PNG"></div>`;

	} 
}