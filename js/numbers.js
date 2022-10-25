function get_num_display_ids(number = 0) {
	if (number < 0 || number == Infinity) return [0, 0];
	if (number < 4) return [0, number];
	if (number.toString(4).length > 20) {
		var string = number.toString(4).slice(0, 16);
		string += "|" + Math.round(number.toString(4).length - 16).toString(4);
		return string.split("").map(Number);
	};
	return number.toString(4).split("").map(Number);
};

function get_number_offset(numbers = []) {
	var offset = 0;
	for (let index = 0; index < numbers.length; index++) {
		const ids = get_num_display_ids(numbers[index]);
		if (ids.includes(NaN)) offset += ids.length * 3 + 6;
		else offset += ids.length * 3 + 1;
	};
	return offset;
};

function print_number(number, offset, round = false) {
	var ids = get_num_display_ids(number);
	for (let index = 0; index < ids.length; index++) {
		if (ids[index] !== ids[index]) {
			print_image(img.core, offset + 1);
			offset += 8;
		} else {
			if (round) {
				if (index == 0) {
					print_image(img.tile.left[ids[index]], offset);
				} else if (index == ids.length - 1) {
					print_image(img.tile.right[ids[index]], offset);
				} else {
					print_image(img.tile.center[ids[index]], offset);
				};
			} else {
				print_image(img.tile.center[ids[index]], offset);
			};
			offset += 3;
		};
	};
	return offset + 1;
};
