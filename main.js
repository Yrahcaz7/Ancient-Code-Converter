document.addEventListener("input", () => {
	var output = "" + document.getElementById("input").value;
	output = output.replace(/[^()\[\]0-9+\-*/%^,]/g, ""); // delete illegal chars
	output = output.replace(/([+\-*/%^,]){2,}/g, "$1"); // delete redundant chars
	output = output.replace(/\(|\[/g, "{").replace(/\)|\]/g, "}"); // convert parentheses
	output = output.replace(/\d{1,}/g, "&#8862"); // convert numbers
	output = output.replace(/\+/g, "&#45"); // convert addition
	output = output.replace(/(\d|\})-/g, "$1&#45["); // convert subtraction
	output = output.replace(/\*/g, "&#45O&#45"); // convert normal multiplication
	output = output.replace(/(&#8862|\})(?=&#8862|\{)/g, "$1&#45O&#45"); // convert parenthesis multiplication
	output = output.replace(/\/|%/g, "_|&#8254"); // convert division
	output = output.replace(/\^&#8862/g, "&#45O&#45&#8853"); // convert exponentiation
	output = output.replace(/\^{&#8862,&#8862}/g, "&#45O&#45{&#8853 &#8862}"); // convert special exponentiation
	output = output.replace(/\^\{/g, "&#45O&#45{").replace(/\^/g, ""); // delete failed exponentiation
	output = output.replace(/-/g, "["); // convert negatives
	output = output.replace(/,/g, ""); // delete extra commas
	document.getElementById("output").innerHTML = output;
});
