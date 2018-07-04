window.onload = async function(){
	initItemModal();
	refreshInventory();
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
			document.getElementById('inventorylist').innerHTML += 
			`<div class="itemcard">
			  <img src="./img/inventory/backdrop.png"/>
			  <div class="itemcardtitle">
			      <h1>${item.name}</h1>
			  </div>
			  <div class="itemcardinfo">
			      <div class="itemcardbuttons">
			        <button id="itemcarddelete">X</button>
			      </div>
			      <div class="itemcarddetails">
			        <p>
			          <strong>
			            SKU: ${item.sku} </br>
			            Price: $${item.price} </br>
			            Quantity: ${item.quantity}
			          </strong>
			        </p>
			      </div>
			  </div>
			</div>`;
			$(document).on('click',`#${item.sku}`, function(){
			 	removeItem(item);
			});
		}
	} else {
		//no inventory found error
		document.getElementById('inventorylist').innerHTML += `<div>Inventory Contains no items<br><img class="emptyInventory" src="../img/core/outofstock.png"></div>`;

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

	try{
		await addItemToDatabase(item);
		await refreshInventory();
		showSuccessMessage();
	} catch(err){
		showErrorMessage(err);
	}
}

async function removeItem(item){
	try {
		await removeItemFromDatabase(item);
	} catch(err) {

	}
}

function showSuccessMessage(){
	$("#error").hide();
	$("#additemmodal").modal('toggle');
	$("#success").show();

}

function showErrorMessage(message){
	console.log(error);
	$("#success").hide();
	$("#additemmodal").modal('toggle');
	$("#error").show();
}