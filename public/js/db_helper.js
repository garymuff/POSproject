// function to check if sku exists in the db
async function getSkuFromDatabase(sku){
	const response = await $.post("/query/sku", {sku: sku})
	.done(function(msg){ 
		return msg;
	}).fail(function(xhr, status, error) {
		console.log(error);
    });

    return response;
}
// function to get all inventory
async function getInventoryFromDatabase(){
	const response = await $.post("/query/inventory")
	.done(function(msg){ 
		return msg;
	}).fail(function(xhr, status, error) {
    	console.log(error);
    });

    return response;
}

// function to add item to inventory
async function addItemToDatabase(item){
	const response = await $.post("/query/add", item)
	.done(function(msg){ 
		return msg;
	}).fail(function(xhr, status, error) {
    	console.log(error);
    });
	
    return response;
}

// function to add item to inventory
async function removeItemFromDatabase(item){
	const response = await $.post("/query/remove", item)
	.done(function(msg){ 
		return msg;
	}).fail(function(xhr, status, error) {
    	console.log(error);
    });
	
    return response;
}
