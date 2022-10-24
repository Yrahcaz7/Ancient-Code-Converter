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
	output = output.replace(/[,=!><]/g, ""); // delete extra chars
	document.getElementById("output").innerHTML = output.replace(/\s/g, "");
	print_result(output, numbers);
});

function dark_mode() { // activates dark mode
	if (document.getElementById("dark_mode_css")) return;
	const add = document.createElement("link");
	add.id = "dark_mode_css";
	add.rel = "stylesheet";
	add.href = "dark.css";
	document.getElementsByTagName("head")[0].appendChild(add);
};

function light_mode() { // activates light mode
	if (!document.getElementById("dark_mode_css")) return;
	document.getElementById("dark_mode_css").remove();
};

var ctx;

function setup_canvas() { // technical stuff
	ctx = document.getElementById("canvas").getContext("2d");
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
};

function print_image(image, offset = 0) { // print an image
	if (!image) return;
	ctx.drawImage(image, (offset + 1) * 10, 10, image.width * 10, image.height * 10);
};

function print_result(string = "", numbers = []) { // prints the result
	update_cavas_size((((string.match(/&#8862|&#8853|&#45(?!O)|&#45O&#45|_\|&#8254/g) || []).length * 7) + ((string.match(/&#12456|&#135&#135/g) || []).length * 6) + ((string.match(/\|\|/g) || []).length * 5) + ((string.match(/\{|\}/g) || []).length * 4) + ((string.match(/\]/g) || []).length * 3) + ((string.match(/\[/g) || []).length * 2) + (string.match(/\s|\[(\|\||&#12456|&#135&#135)/g) || []).length + 2) * 10);
	var remain = "" + string, offset = 0;
	while (remain) {
		if (remain.startsWith("&#8862")) { // prints ⊞
			print_image(img.tile.center[0], offset);
			print_image(img.tile.center[0], offset + 3);
			remain = remain.replace("&#8862", "");
			offset += 7;
		} else if (remain.startsWith("&#8853")) { // prints ⊕
			print_image(img.tile.left[0], offset);
			print_image(img.tile.right[0], offset + 3);
			remain = remain.replace("&#8853", "");
			offset += 7;
		} else if (remain.startsWith("&#12456")) { // prints エ
			print_image(img.bar, offset);
			remain = remain.replace("&#12456", "");
			offset += 6;
		} else if (remain.startsWith("{")) { // prints {
			print_image(img.close_left, offset);
			remain = remain.replace("{", "");
			offset += 4;
		} else if (remain.startsWith("}")) { // prints }
			print_image(img.close_right, offset);
			remain = remain.replace("}", "");
			offset += 4;
		} else if (remain.startsWith("&#45O&#45")) { // prints -O-
			print_image(img.dash_hole, offset);
			remain = remain.replace("&#45O&#45", "");
			offset += 7;
		} else if (remain.startsWith("_|&#8254")) { // prints _|‾
			print_image(img.dash_snake, offset);
			remain = remain.replace("_|&#8254", "");
			offset += 7;
		} else if (remain.startsWith("&#45")) { // prints -
			print_image(img.dash, offset);
			remain = remain.replace("&#45", "");
			offset += 7;
		} else if (remain.startsWith("||")) { // prints ||
			print_image(img.double_line, offset);
			remain = remain.replace("||", "");
			offset += 5;
		} else if (remain.startsWith("&#135&#135")) { // prints ‡‡
			print_image(img.hash, offset);
			remain = remain.replace("&#135&#135", "");
			offset += 6;
		} else if (remain.startsWith("[")) { // prints [
			if (remain.startsWith("[||") || remain.startsWith("[&#12456") || remain.startsWith("[&#135&#135")) offset++;
			print_image(img.not, offset);
			remain = remain.replace("[", "");
			offset += 2;
		} else if (remain.startsWith("]")) { // prints ]
			print_image(img.to, offset);
			remain = remain.replace("]", "");
			offset += 3;
		} else {
			remain = remain.slice(1);
			offset++;
		};
	};
};

function update_cavas_size(px) { // changes canvas size (and clears it)
	if (!document.getElementById("canvas")) return;
	if (px < 0) px = 0;
	document.getElementById("canvas").width = px;
	setup_canvas();
};
