document.addEventListener("input", () => {
	var output = "" + document.getElementById("input").value;
	output = output.replace(/[^()\[\]0-9+\-*/%]/g, ""); // delete illegal chars
	output = output.replace(/([+\-*/%]){2,}/g, "$1"); // delete redundant chars
	output = output.replace(/\(|\[/g, "{").replace(/\)|\]/g, "}"); // convert parentheses
	output = output.replace(/\d{1,}/g, "&#8862"); // convert numbers
	output = output.replace(/\+/g, "&#45"); // convert addition
	output = output.replace(/(\d|\})-/g, "$1&#45["); // convert subtraction
	output = output.replace(/\*/g, "&#45O&#45"); // convert multiplication
	output = output.replace(/\/|%/g, "_|&#8254"); // convert division
	output = output.replace(/-/g, "["); // convert negatives
	document.getElementById("output").innerHTML = output;
});
