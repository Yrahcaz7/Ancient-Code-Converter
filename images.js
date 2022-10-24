const img = {
	tile: {
		center: [new Image, new Image, new Image, new Image],
		left: [new Image, new Image, new Image, new Image],
		merge: [new Image, new Image, new Image, new Image],
		right: [new Image, new Image, new Image, new Image],
	},
	bar: new Image,
	close_left: new Image,
	close_right: new Image,
	dash_hole: new Image,
	dash_snake: new Image,
	dash: new Image,
	double_line: new Image,
	hash: new Image,
	not: new Image,
	to: new Image,
};

for (const image in img) {
	if (Object.hasOwnProperty.call(img, image)) {
		if (image == "tile") {
			for (const key in img.tile) {
				if (Object.hasOwnProperty.call(img.tile, key)) {
					for (let index = 0; index < img.tile[key].length; index++) {
						img.tile[key][index].src = "png/tiles/tile-" + key + "-" + index + ".png";
					};
				};
			};
		} else img[image].src = "png/" + image.replace(/_/g, "-") + ".png";
	};
};
