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
	document.getElementById('inventorylist').innerHTML = 
			`<div class="itemcard">
			  <img src="./img/inventory/backdrop.png"/>
			  <div id="addcardtitle">
			      <h1 style="font-size: 5em;">+</h1>
			  </div>
			  <div class="itemcardinfo" onclick="toggleModal()">
			  	<div class="addcarddetail">
		        	Add New Item
		      	</div>
			  </div>
			</div>`;
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
			        <button class="itemcarddelete" id="${item.sku}"><i class="fa fa-trash"></i></button>
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
		showSuccessMessage("Success!: Item added successfully");
		toggleModal();
	} catch(err){
		showErrorMessage("Error!: " + err.responseText);
		toggleModal();
	}
}

async function removeItem(item){
	try {
		await removeItemFromDatabase(item);
		showSuccessMessage("Success!: Item removed successfully");
		refreshInventory();
	} catch(err) {
		showErrorMessage("Error!: " + err.responseText);
	}
}

function showSuccessMessage(message){
	$("#error").hide();
	$("#success").text(message);
	$("#success").fadeTo(2000, 500).slideUp(500, function(){
    	$("#success").slideUp(500);
	});
}

function showErrorMessage(message){
	$("#success").hide();
	$("#error").text(message);
	$("#error").fadeTo(2000, 500).slideUp(500, function(){
    	$("#error").slideUp(500);
	});
}

function toggleModal(){
	$("#additemmodal").modal('toggle');
}