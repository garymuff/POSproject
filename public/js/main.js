
//made variable to globally change SKU length
var SKUlength = 6;

window.onload = function(){ 



	//run the backspace display function to show/hide backspace
	bsdiplay();
	//Backspace button functionality
	document.getElementById("backspace").onclick = function() {
		var bs = document.getElementById("numberpaddisplay");
		if (isEmpty(bs) == false){
			bs.value = bs.value.substring(0, bs.value.length - 1);
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};

	// Begin code for numpad button click
	document.getElementById("zero").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '0';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("one").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '1';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("two").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '2';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("three").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '3';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("four").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '4';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("five").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '5';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("six").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '6';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("seven").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '7';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("eight").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '8';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("nine").onclick = function() {
		var add = document.getElementById("numberpaddisplay");
		if (ismaxlength(add) == false){
			add.value += '9';
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("del").onclick = function() {
		var del = document.getElementById("numberpaddisplay");
		del.value = "";
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	document.getElementById("enter").onclick = async function() {
		var display = document.getElementById("numberpaddisplay");
		if (ismaxlength(display)){
			const item = await getSkuFromDatabase(display.value);
			console.log(item);
			if(item !== ''){
				document.getElementById("ledger").innerHTML += "<div class=\"item\"><div class=\"SKU labelleft\">"+item.sku+"</div><div class=\"qty labelleft\">1</div><div class=\"name labelleft\">"+item.name+"</div><div class=\"price\">"+item.price+"&nbsp;</div></div>";
				clearDisplay(display);
			} else {
				document.getElementById("npderror").innerHTML = "SKU out of stock";
				document.getElementById("npderror").style.display = "inline";
				$("#npderror").fadeOut(1500);
				clearDisplay(display);
			}
		} else{
			document.getElementById("npderror").innerHTML = "Error: Enter " + SKUlength + " Digit SKU";
			document.getElementById("npderror").style.display = "inline";
			$("#npderror").fadeOut(1500);
		}
		//run the backspace display function to show/hide backspace
		bsdiplay();
	};
	//End code for numpad button click


	//Begin javascript for checkout popup

	document.getElementById('checkout').onclick = function() {
		modal.style.display = "block";
	}

	//Get modal
	var modal = document.getElementById('checkoutModal');
	
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

	//End code for checkout popup
	
};

//function to check if sku exists in the db
async function getSkuFromDatabase(sku){
	const response = await $.post("/query", {sku: sku})
	.done(function(msg){ 
		return msg;
	}).fail(function(xhr, status, error) {
    	alert("Server error");
    });

    return response;
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

function bsdiplay() {
	input = document.getElementById("numberpaddisplay").value
	if (input.length == 0){
		document.getElementById("backspace").style.display = "none";
		$("#enter").addClass("disabledbutton disableclick");
		$("#del").addClass("disabledbutton disableclick");
	} else{
		document.getElementById("backspace").style.display = "inline";
		$("#enter").removeClass("disabledbutton disableclick");
		$("#del").removeClass("disabledbutton disableclick");
	}
};