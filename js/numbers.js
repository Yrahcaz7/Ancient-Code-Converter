function get_num_display_ids(number = 0) {
	if (number < 0) return [0, 0];
	if (number < 4) return [0, number];
	return number.toString(4).split("").map(Number);
};

function get_number_offset(numbers = []) {
	var offset = 0;
	for (let index = 0; index < numbers.length; index++) {
		const len = get_num_display_ids(numbers[index]).length;
		offset += len * 3 + 1;
	};
	return offset;
};

function print_number(number, offset, round = false, merge = false) {
	var ids = get_num_display_ids(number);
	for (let index = 0; index < ids.length; index++) {
		if (round) {
			if (index == 0) {
				if (merge) print_image(img.tile.merge[ids[index]], offset);
				else print_image(img.tile.left[ids[index]], offset);
			} else if (index == ids.length - 1) {
				print_image(img.tile.right[ids[index]], offset);
			};
		} else {
			print_image(img.tile.center[ids[index]], offset);
		};
		offset += 3;
	};
	return offset + 1;
};
