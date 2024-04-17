const MODE_COLORS = [
	["#F0F0F0", "#101010", "#C0C0C0", "#F0F0F0"],
	["#C0C0C0", "#404040", "#808080", "#C0C0C0"],
	["#101010", "#F0F0F0", "#C0C0C0", "#101010"],
	["#101010", "#00F000", "#00C000", "#101010"],
	["#FFFFFF", "#FF73FD", "#FF73FD", "#FF73FD"],
];

const EMOJIS = [127815, 127818, 127820, 127827, 127829, 127846, 127847, 127848, 127849, 127850, 127851, 127852, 127853, 127856, 129374, 129390, 129473];

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
	document.documentElement.style.setProperty("--scrt-color", MODE_COLORS[num][3]);
	if (num == 4) {
		let text = "<div id='emojis'>";
		for (let index = 0; index < 1000; index++) {
			text += "&#" + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
		};
		document.getElementById("header").innerHTML = text + "</div>";
		document.getElementById("header").style.setProperty("margin", "0px -8px");
		document.getElementById("header").style.setProperty("color", "#00000000");
		document.getElementById("secret").style.setProperty("box-shadow", "0px 0px 10px 5px var(--scrt-color)");
		document.getElementById("secret").style.setProperty("animation", "rainbow 5s infinite linear");
		document.getElementById("cover").style.setProperty("animation", "rainbow 5s infinite linear");
	} else {
		document.getElementById("header").innerHTML = "A note of importance: All numbers have to be integers or fractions. &#8476 represents any valid number.";
		document.getElementById("header").style.removeProperty("margin");
		document.getElementById("header").style.removeProperty("color");
		document.getElementById("secret").style.removeProperty("box-shadow");
		document.getElementById("secret").style.removeProperty("animation");
		document.getElementById("cover").style.removeProperty("animation");
	};
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
	if (mode == 2 || mode == 3) ctx.filter = "invert(100%)";
};

/**
 * Prints an image on the canvas.
 * @param {HTMLImageElement} image - the image to print.
 * @param {number} offset - the offset in scaled pixels.
 */
function print_image(image, offset) {
	ctx.drawImage(image, (offset + 1) * 10, 10, image.width * 10, image.height * 10);
};
