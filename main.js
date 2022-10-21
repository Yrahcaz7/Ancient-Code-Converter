document.addEventListener("input", () => {
	var output = "" + document.getElementById("input").value;
	output = output.replace(/[^()\[\]0-9+\-*/%^,=!><]/g, ""); // delete illegal chars
	output = output.replace(/(>|<|=)-/g, "$1 -"); // separate negatives and equalities
	output = output.replace(/(\+|-|\*|\/|%|\^|,|>=|>|<=|<|!=){2,}/g, "$1"); // delete redundant chars
	const numbers = output.split(/[^0-9]/g).filter(element => element);
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
	output = output.replace(/>=/g, "]&#135&#135").replace(/>/g, "]&#12456"); // convert greater than
	output = output.replace(/<=/g, "][&#135&#135").replace(/</g, "][&#12456"); // convert less than
	output = output.replace(/!=/g, "[||").replace(/=/g, "||"); // convert equals
	output = output.replace(/[,=!><\s]/g, ""); // delete extra chars
	document.getElementById("output").innerHTML = output;
	print_result(output, numbers);
});

function dark_mode() {
	if (document.getElementById("dark_mode_css")) return;
	const add = document.createElement("link");
	add.id = "dark_mode_css";
	add.rel = "stylesheet";
	add.href = "dark.css";
	document.getElementsByTagName("head")[0].appendChild(add);
};

function light_mode() {
	if (!document.getElementById("dark_mode_css")) return;
	document.getElementById("dark_mode_css").remove();
};

var ctx;

function setup_canvas() {
	ctx = document.getElementById("canvas").getContext("2d");
	ctx.imageSmoothingEnabled = false;
};

function print_result(string, numbers) {
	// ctx stuff here
};

function update_cavas_size(px) {
	if (!document.getElementById("canvas")) return;
	if (px < 0) px = 0;
	document.getElementById("canvas").width = px;
};
