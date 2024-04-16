const I = {
	tile: {
		center: [new Image, new Image, new Image, new Image],
		left: [new Image, new Image, new Image, new Image],
		right: [new Image, new Image, new Image, new Image],
	},
	bar: new Image,
	close_left: new Image,
	close_right: new Image,
	core: new Image,
	dash_hole: new Image,
	dash_snake: new Image,
	dash_snake_ex: [new Image, new Image, new Image],
	dash: new Image,
	double_line: new Image,
	hash: new Image,
	not: new Image,
	not_ex: new Image,
	to: new Image,
};

for (const image in I) {
	if (Object.hasOwnProperty.call(I, image)) {
		if (image == "tile") {
			for (const key in I.tile) {
				if (Object.hasOwnProperty.call(I.tile, key)) {
					for (let index = 0; index < I.tile[key].length; index++) {
						I.tile[key][index].src = "images/tiles/" + key + "-" + index + ".png";
					};
				};
			};
		} else if (image == "dash_snake_ex") {
			for (let index = 0; index < I.dash_snake_ex.length; index++) {
				I.dash_snake_ex[index].src = "images/dash-snake-ex-" + index + ".png";
			};
		} else I[image].src = "images/" + image.replace(/_/g, "-") + ".png";
	};
};
