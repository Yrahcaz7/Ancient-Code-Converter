document.addEventListener("input", () => {
	var output = "" + document.getElementById("input").value;
	output = output.replace(/[^()\[\]0-9+\-*/%]/g, ""); // delete illegal chars
	output = output.replace(/([+\-*/%]){2,}/g, "$1"); // delete redundant chars
	output = output.replace(/\(|\[/g, "{").replace(/\)|\]/g, "}"); // replace parentheses
	output = output.replace(/\d{1,}/g, "&#8862"); // replace numbers
	output = output.replace(/\+/g, "&#45"); // replace addition
	output = output.replace(/(\d|\})-/g, "$1&#45["); // replace subtraction
	output = output.replace(/\*/g, "&#45O&#45"); // replace multiplication
	output = output.replace(/\/|%/g, "_|&#8254"); // replace division
	output = output.replace(/-/g, "["); // replace negatives
	document.getElementById("output").innerHTML = output;
});
