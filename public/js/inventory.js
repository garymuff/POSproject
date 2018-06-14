window.onload = function(){ 
	document.getElementById('necklace1').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('necklace2').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('necklace3').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('necklace4').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('necklace5').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('bracelet1').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('bracelet2').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('bracelet3').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('bracelet4').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('bracelet5').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('ring1').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('ring2').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('ring3').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('ring4').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('ring5').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('other1').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('other2').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('other3').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('other4').onclick = function() {
		modal.style.display = "block";
	}
	document.getElementById('other5').onclick = function() {
		modal.style.display = "block";
	}
//Get modal
	var modal = document.getElementById('myModal');
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