window.onload = function(){ 
	document.getElementById('checkout').onclick = function() {
		modal.style.display = "block";
	}

//Get modal
	var modal = document.getElementById('checkoutModal');
//Get btn to open modal
	//var btn = document.getElementById('necklace1');
//Get span element to close modal
	var span = document.getElementsByClassName("close")[0];
//When user clicks btn, open modal
	/*btn.onclick = function() {
		modal.style.display = "block";
	}*/
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