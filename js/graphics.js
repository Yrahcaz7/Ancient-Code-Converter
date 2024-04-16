let mode = 0;

function light_mode() { // activates light mode
	if (mode == 0) return;
	document.documentElement.style.setProperty("--bg-color", "#F0F0F0");
	document.documentElement.style.setProperty("--txt-color", "#000000");
	document.documentElement.style.setProperty("--hr-color", "#C0C0C0");
	mode = 0;
	on_input();
};

function dim_mode() { // activates dim mode
	if (mode == 1) return;
	document.documentElement.style.setProperty("--bg-color", "#C0C0C0");
	document.documentElement.style.setProperty("--txt-color", "#404040");
	document.documentElement.style.setProperty("--hr-color", "#808080");
	mode = 1;
	on_input();
};

function dark_mode() { // activates dark mode
	if (mode == 2) return;
	document.documentElement.style.setProperty("--bg-color", "#101010");
	document.documentElement.style.setProperty("--txt-color", "#F0F0F0");
	document.documentElement.style.setProperty("--hr-color", "#C0C0C0");
	mode = 2;
	on_input();
};

function neon_mode() { // activates neon mode
	if (mode == 3) return;
	document.documentElement.style.setProperty("--bg-color", "#101010");
	document.documentElement.style.setProperty("--txt-color", "#00FF00");
	document.documentElement.style.setProperty("--hr-color", "#00C000");
	mode = 3;
	on_input();
};

var ctx;

function setup_canvas() { // technical stuff
	ctx = document.getElementById("canvas").getContext("2d");
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	if (mode >= 2) ctx.filter = "invert(1)";
};

function update_cavas_size(px) { // changes canvas size (and clears it)
	if (!document.getElementById("canvas")) return;
	if (px < 0) px = 0;
	if (px > 32767) px = 32767;
	if (document.getElementById("warning")) { // displays large size warnings
		if (px == 32767) document.getElementById("warning").innerHTML = "Large size warning: cannot display more than a 32,767px width on any device or browser. Cutting off at 32,767px.";
		else if (px > 4096) document.getElementById("warning").innerHTML = "Large size warning: cannot display more than a 4,096px width on some mobile devices.";
		else document.getElementById("warning").innerHTML = "";
	};
	document.getElementById("canvas").width = px;
	setup_canvas();
};

function print_image(image, offset = 0) { // print an image
	if (!image) return;
	ctx.drawImage(image, (offset + 1) * 10, 10, image.width * 10, image.height * 10);
};
