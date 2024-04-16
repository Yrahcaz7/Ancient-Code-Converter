document.addEventListener("input", calculate_output);

/**
 * Calculates the output and prints it.
 */
function calculate_output() {
	// calculation
	let output = "" + document.getElementById("input").value;
	output = output.replace(/[^()\[\]0-9+\-*/%^,=!><]/g, ""); // delete illegal chars
	output = output.replace(/(>|<|=)-/g, "$1 -"); // separate negatives and equalities
	output = output.replace(/(\+|-|\*|\/|%|\^|,|>=|>|<=|<|!=){2,}/g, "$1"); // delete redundant chars
	let numbers = output.split(/[^0-9]/g).filter(element => element).map(Number);
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
	// printing
	update_cavas_size((((output.match(/&#45(?!O)|&#45O&#45|_\|&#8254/g) || []).length * 7) + ((output.match(/&#12456|&#135&#135/g) || []).length * 6) + ((output.match(/\|\|/g) || []).length * 5) + ((output.match(/\{|\}/g) || []).length * 4) + ((output.match(/\]/g) || []).length * 3) + ((output.match(/\[/g) || []).length * 2) + (output.match(/\s|\[(\|\||&#12456|&#135&#135)/g) || []).length + get_number_offset(numbers) + 2) * 10);
	let remain = "" + output, offset = 0;
	while (remain) {
		if (remain.startsWith("&#8862")) { // prints ⊞
			offset = print_number(numbers.shift(), offset);
			remain = remain.replace("&#8862", "");
		} else if (remain.startsWith("&#8853_|&#8254")) { // prints ⊕_|‾ (special case)
			offset = print_number(numbers.shift(), offset, true);
			if (remain.startsWith("&#8853_|&#8254{")) print_image(I.dash_snake_ex[1], offset - 2);
			else print_image(I.dash_snake_ex[0], offset - 2);
			remain = remain.replace("&#8853_|&#8254", "");
			offset += 7;
		} else if (remain.startsWith("&#8853")) { // prints ⊕
			offset = print_number(numbers.shift(), offset, true);
			remain = remain.replace("&#8853", "");
		} else if (remain.startsWith("&#12456")) { // prints エ
			print_image(I.bar, offset);
			remain = remain.replace("&#12456", "");
			offset += 6;
		} else if (remain.startsWith("{")) { // prints {
			print_image(I.close_left, offset);
			remain = remain.replace("{", "");
			offset += 4;
		} else if (remain.startsWith("}_|&#8254")) { // prints }_|‾ (special case)
			print_image(I.close_right, offset);
			offset += 4;
			if (remain.startsWith("}_|&#8254{")) print_image(I.dash_snake_ex[1], offset - 2);
			else print_image(I.dash_snake_ex[0], offset - 2);
			remain = remain.replace("}_|&#8254", "");
			offset += 7;
		} else if (remain.startsWith("}")) { // prints }
			print_image(I.close_right, offset);
			remain = remain.replace("}", "");
			offset += 4;
		} else if (remain.startsWith("&#45O&#45")) { // prints -O-
			print_image(I.dash_hole, offset);
			remain = remain.replace("&#45O&#45", "");
			offset += 7;
		} else if (remain.startsWith("_|&#8254")) { // prints _|‾
			if (remain.startsWith("_|&#8254{")) print_image(I.dash_snake_ex[2], offset);
			else print_image(I.dash_snake, offset);
			remain = remain.replace("_|&#8254", "");
			offset += 7;
		} else if (remain.startsWith("&#45")) { // prints -
			print_image(I.dash, offset);
			remain = remain.replace("&#45", "");
			offset += 7;
		} else if (remain.startsWith("||")) { // prints ||
			print_image(I.double_line, offset);
			remain = remain.replace("||", "");
			offset += 5;
		} else if (remain.startsWith("&#135&#135")) { // prints ‡‡
			print_image(I.hash, offset);
			remain = remain.replace("&#135&#135", "");
			offset += 6;
		} else if (remain.startsWith("[")) { // prints [
			if (remain.startsWith("[||") || remain.startsWith("[&#12456") || remain.startsWith("[&#135&#135")) offset++;
			if (remain.startsWith("[{")) print_image(I.not_ex, offset);
			else print_image(I.not, offset);
			remain = remain.replace("[", "");
			offset += 2;
		} else if (remain.startsWith("]")) { // prints ]
			print_image(I.to, offset);
			remain = remain.replace("]", "");
			offset += 3;
		} else {
			remain = remain.slice(1);
			offset++;
		};
	};
};
