const MODE_COLORS = [
	["#F0F0F0", "#101010", "#C0C0C0"],
	["#C0C0C0", "#404040", "#808080"],
	["#101010", "#F0F0F0", "#C0C0C0"],
	["#101010", "#00F000", "#00C000"],
];

let mode = 0;

/**
 * Changes the display mode.
 * @param {number} num - the mode number.
 */
function change_mode(num) {
	if (num === mode) return;
	document.documentElement.style.setProperty("--bg-color", MODE_COLORS[num][0]);
	document.documentElement.style.setProperty("--txt-color", MODE_COLORS[num][1]);
	document.documentElement.style.setProperty("--hr-color", MODE_COLORS[num][2]);
	mode = num;
	calculate_output();
};

let ctx;

/**
 * Changes the canvas size and clears the canvas.
 * @param {number} px - the width in pixels.
 */
function update_cavas_size(px) {
	if (!document.getElementById("canvas")) return;
	if (px < 0) px = 0;
	else if (px > 32767) px = 32767;
	document.getElementById("canvas").width = px;
	if (px == 32767) document.getElementById("warning").innerHTML = "Large size warning: cannot display more than a 32,767px width on any device or browser. Cutting off at 32,767px.";
	else if (px > 4096) document.getElementById("warning").innerHTML = "Large size warning: cannot display more than a 4,096px width on some mobile devices.";
	else document.getElementById("warning").innerHTML = "";
	ctx = document.getElementById("canvas").getContext("2d");
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	if (mode >= 2) ctx.filter = "invert(100%)";
};

/**
 * Prints an image on the canvas.
 * @param {HTMLImageElement} image - the image to print.
 * @param {number} offset - the offset in scaled pixels.
 */
function print_image(image, offset) {
	if (!image) return;
	ctx.drawImage(image, (offset + 1) * 10, 10, image.width * 10, image.height * 10);
};
