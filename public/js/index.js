
//made variable to globally change SKU length
var SKUlength = 6;
//Load cart from cookie if it exists
var cart = getCart();

window.onload = function(){ 
	restoreCart();
	//run the backspace display function to show/hide backspace
	bsDisplay();
	//Backspace button functionality
	document.getElementById("backspace").onclick = function() {
		var bs = document.getElementById("numberpaddisplay");
		if (isEmpty(bs) == false){
			bs.value = bs.value.substring(0, bs.value.length - 1);
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};

	// Begin code for numpad button click
	document.getElementById("zero").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '0';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("one").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '1';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("two").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '2';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("three").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '3';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("four").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '4';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("five").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '5';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("six").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '6';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("seven").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '7';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("eight").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '8';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("nine").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '9';
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
	};
	document.getElementById("del").onclick = function() {
		var del = document.getElementById("numberpaddisplay");
		del.value = "";
		//run the backspace display function to show/hide backspace
		bsDisplay();
		qtyReset();
	};
	document.getElementById("enter").onclick = async function() {
		hidePaymentOptions();
		await validateItem(cart);
	};
	//End code for numpad button click

	//Begin code for QTY clicks
	document.getElementById("qtymore").onclick = function() {
		var qtyvalue = document.getElementById("qtyinput");
		if(parseInt(qtyvalue.value) < 99){
			qtyvalue.value = parseInt(qtyvalue.value) + 1;
		}
		//run the qty button function to enable/disable the button
		qtybuttoncheck();
	};

	document.getElementById("qtyless").onclick = function() {
		var qtyvalue = document.getElementById("qtyinput");
		if(parseInt(qtyvalue.value) > 1){
			qtyvalue.value = parseInt(qtyvalue.value) - 1;
		}
		//run the qty button function to enable/disable the button
		qtybuttoncheck();
	};


	//Begin javascript for checkout popup

	document.getElementById('checkoutbutton').onclick = function() {
		hideCheckoutButton();		
		showPaymentOptions();
	}

	document.getElementById('cashbutton').onclick = function() {
		document.getElementById("checkoutmodal").style.display = "block";
		document.getElementById("cashtextid").min = getTotal(cart);
		updateTotal('modaltotalvalue');
	}

	//Get modal
	var modal = document.getElementById('checkoutmodal');
	
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
			location.reload();
		}
	}

	//End code for checkout popup
	
};

function pushToCart(item){
	const index = cart.findIndex((it => it.sku === item.sku));
	if(index === -1){
		cart.push(item);
	} else {
		cart[index].quantity += item.quantity;
	}
}	
// function to validate entered item skus
async function validateItem(){
	var display = document.getElementById("numberpaddisplay");
		if (ismaxlength(display)){
			const item = await getSkuFromDatabase(display.value);
			if(item !== ''){
				if(parseInt(item.quantity) >= parseInt(getQuantity(item.sku))){
					item.quantity = getQuantity();
					clearDisplay(display);
					pushToCart(item);
					saveToCookie(cart);
					restoreCart();
					updateTotal('totalvalue');
				} else {
					document.getElementById("npderror").innerHTML = "Quantity exceeds stock";
					document.getElementById("npderror").style.display = "inline";
					$("#npderror").fadeOut(2800);
					clearDisplay(display);
				}
				
			} else {
				document.getElementById("npderror").innerHTML = "SKU out of stock";
				document.getElementById("npderror").style.display = "inline";
				$("#npderror").fadeOut(2800);
				clearDisplay(display);
			}
		} else{
			document.getElementById("npderror").innerHTML = "Error: Enter " + SKUlength + " Digit SKU";
			document.getElementById("npderror").style.display = "inline";
			$("#npderror").fadeOut(2800);
		}
		//run the backspace display function to show/hide backspace
		bsDisplay();
		qtyReset();
}

// onclick function for enter button
function changeDue(){
	paymentSuccessful();
	hideCheckoutButton();
	hidePaymentOptions();
	clearCart();
	restoreCart();
}
// function to hide checkout button
function hideCheckoutButton(){
	$("#checkoutbutton").addClass("disablebutton");
	$("#checkoutbutton").removeClass("checkoutbutton");
}
// function to reveal checkout button
function showCheckoutButton(){
	$("#checkoutbutton").addClass("checkoutbutton");
	$("#checkoutbutton").removeClass("disablebutton");
}
// function to hide cash and credit buttons
function hidePaymentOptions(){
	$("#cashbutton").removeClass("cashbutton");
	$("#cashbutton").addClass("disablebutton");
	$("#cardbutton").removeClass("cardbutton");
	$("#cardbutton").addClass("disablebutton");
}
// function to reveal cash and credit buttons
function showPaymentOptions(){
	$("#cashbutton").removeClass("disablebutton");
	$("#cashbutton").addClass("cashbutton");
	$("#cardbutton").removeClass("disablebutton");
	$("#cardbutton").addClass("cardbutton");
}

//function to display payment successfull message
function paymentSuccessful(){
	const cash = document.getElementById('cashtextid').value;
	const due = parseFloat(cash) - getTotal(cart);
	document.getElementById('modaltotallabel').innerHTML = "Change Due:";
	document.getElementById('modaltotalvalue').innerHTML = "$" + due.toFixed(2);
	document.getElementById('modalcashlabel').innerHTML = '';
	document.getElementById('cashtextid').style.display = 'none';
	document.getElementById('enterbuttonid').style.display = 'none';
}

//function to clear numpad
function clearDisplay(numpad){
	numpad.value = "";
}

//function to check for max length of sixe digits
function ismaxlength(input) {
	input = input.value;
	if (input.length < 6){
		return false;
	} else{
		return true;
	}
};

//function to check if input is empty
function isEmpty(input) {
	input = input.value;
	if (input.length != 0){
		return false;
	} else{
		return true;
	}
};

function bsDisplay() {
	input = document.getElementById("numberpaddisplay").value
	if (input.length == 0){
		document.getElementById("backspace").style.display = "none";
		$("#enter").addClass("disabledbutton disableclick");
		$("#zero").addClass("zerofix");
		$("#del").addClass("disabledbutton disableclick");
	} else{
		document.getElementById("backspace").style.display = "inline";
		$("#enter").removeClass("disabledbutton zerofix disableclick");
		$("#zero").removeClass("zerofix");
		$("#del").removeClass("disabledbutton disableclick");
	}
};

function qtybuttoncheck() {
	if(parseInt(document.getElementById("qtyinput").value) === 1 ){
		$("#qtyless").addClass("disabledbutton disableclick");
	}else{
		$("#qtyless").removeClass("disabledbutton disableclick");
	}

	if(parseInt(document.getElementById("qtyinput").value) === 99 ){
		$("#qtymore").addClass("disabledbutton disableclick");
	}else{
		$("#qtymore").removeClass("disabledbutton disableclick");
	}

};

// Gets total price from cart
function getTotal(cart){
	var total = 0;
	for(var i=0; i<cart.length; i++){
		total+=parseFloat(cart[i].price * cart[i].quantity);
	}
	return total.toFixed(2);
}
// Updates total everytime you submit an item
function updateTotal(element){
	var cart = getCart();
	var total = getTotal(cart);
	document.getElementById(element).innerHTML = '$' + total;
}
// Gets quantity from quantity ticker thingy
function getQuantity(sku){
	const quantityFromTicker = document.getElementById("qtyinput").value;
	const quantityFromCart = getItemQuantity(sku);
	const quantity = parseInt(quantityFromTicker) + quantityFromCart;
	return quantity;
}

function addItemToCart(item){
	document.getElementById("ledger").innerHTML += "<div class=\"item\"><div class=\"SKU labelleft\">"+item.sku+"</div><div class=\"qty labelleft\">"+item.quantity+"</div><div class=\"name labelleft\">"+item.name+"</div><div class=\"price\">"+ '$' + (item.price * item.quantity).toFixed(2) +"&nbsp;</div></div>";
	$("#checkoutbutton").removeClass("disablebutton");
	$("#checkoutbutton").addClass("checkoutbutton");
};

function getItemQuantity(sku){
	const cart = getCart();
	var quantity = 0;
	
	for(var i=0; i<cart.length; i++){
		if(cart[i].sku === sku){
			quantity += cart[i].quantity;
		}
	}
	return quantity;
}
// Restore cart from cookie
function restoreCart(){
	document.getElementById("ledger").innerHTML = "";
	var cookie = getCart();
	for(var i=0; i<cookie.length; i++){
		addItemToCart(cookie[i]);
	}
	updateTotal('totalvalue');
};

// Save cart to cookie
function saveToCookie(cart){
	$.cookie('cart', JSON.stringify(cart));
}

// Clear cart from cookie
function clearCart(){
	$.removeCookie('cart');
	document.getElementById("ledger").innerHTML = '';
	$("#checkoutbutton").addClass("disablebutton");
	$("#checkoutbutton").removeClass("checkoutbutton");
}

// Get cart from cookie
function getCart(){
	if($.cookie('cart') !== undefined){
		return JSON.parse($.cookie('cart'));
	} else {
		return [];
	}
}

// Reset the QTY input

function qtyReset() {
	document.getElementById("qtyinput").value = "1";
	qtybuttoncheck();
}