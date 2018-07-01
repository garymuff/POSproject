window.onload = async function(){
	initItemModal();
	refreshInventory();
}

// Function to update values of the modal from the item attributes
function updateModal(item) {
	document.getElementById('productName').innerHTML = item.name;
	document.getElementById('priceAndQTY').innerHTML = `<p>Price: $${item.price}<br>Quantity: ${item.quantity}</p>`;
	document.getElementById('productSKU').innerHTML = `SKU: ${item.sku}`;
}

function initItemModal(){
	//Get modal
	var modal = document.getElementById('itemmodal');
	//Get span element to close modal
	var span = document.getElementsByClassName("close")[0];
	//When user clicks x, close modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	//When user clicks outside modal, close modal
	window.onclick = function(event) {
		if(event.target == modal) {
			modal.style.display = "none";
		}
	}
}
async function refreshInventory(){
	const inventory = await getInventoryFromDatabase();
	console.log(inventory);
	document.getElementById('inventorylist').innerHTML = ``;
	if(inventory.length !== 0){
		for(var i = 0; i < inventory.length; i++){
			const item = inventory[i];
			const sku = item.sku;
			document.getElementById('inventorylist').innerHTML += `<button class=\"itembtn" id="${sku}"></button>`;
			$(document).on('click',`#${sku}`,function(){
			 	updateModal(item);
				document.getElementById('itemmodal').style.display = "block";
			});
		}
	} else {
		//no inventory found error
		document.getElementById('inventorylist').innerHTML = `<div>Inventory Contains no items<br><img class="emptyInventory" src="../img/core/outofstock.PNG"></div>`;

	} 
}
//function to add item to database
async function addItem(){

	const item = {
		sku: document.getElementById('skufield').value,
		name: document.getElementById('namefield').value,
		category: document.getElementById('categoryfield').value,
		price: document.getElementById('pricefield').value,
		quantity: document.getElementById('quantityfield').value,
	}

	await addItemToDatabase(item);
	await refreshInventory();
}