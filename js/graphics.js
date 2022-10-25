function light_mode() { // activates light mode
	if (document.getElementById("dim_mode_css")) document.getElementById("dim_mode_css").remove();
	if (document.getElementById("dark_mode_css")) document.getElementById("dark_mode_css").remove();
	if (document.getElementById("neon_mode_css")) document.getElementById("neon_mode_css").remove();
};

function dim_mode() { // activates dim mode
	if (document.getElementById("dim_mode_css")) return;
	if (document.getElementById("dark_mode_css")) document.getElementById("dark_mode_css").remove();
	if (document.getElementById("neon_mode_css")) document.getElementById("neon_mode_css").remove();
	const add = document.createElement("link");
	add.id = "dim_mode_css";
	add.rel = "stylesheet";
	add.href = "css/dim.css";
	document.getElementsByTagName("head")[0].appendChild(add);
};

function dark_mode() { // activates dark mode
	if (document.getElementById("dark_mode_css")) return;
	if (document.getElementById("dim_mode_css")) document.getElementById("dim_mode_css").remove();
	if (document.getElementById("neon_mode_css")) document.getElementById("neon_mode_css").remove();
	const add = document.createElement("link");
	add.id = "dark_mode_css";
	add.rel = "stylesheet";
	add.href = "css/dark.css";
	document.getElementsByTagName("head")[0].appendChild(add);
};

function neon_mode() { // activates neon mode
	if (document.getElementById("neon_mode_css")) return;
	if (document.getElementById("dim_mode_css")) document.getElementById("dim_mode_css").remove();
	if (document.getElementById("dark_mode_css")) document.getElementById("dark_mode_css").remove();
	const add = document.createElement("link");
	add.id = "neon_mode_css";
	add.rel = "stylesheet";
	add.href = "css/neon.css";
	document.getElementsByTagName("head")[0].appendChild(add);
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

function update_cavas_size(px) { // changes canvas size (and clears it)
	if (!document.getElementById("canvas")) return;
	if (px < 0) px = 0;
	if (px > 32767) px = 32767;
	if (document.getElementById("warning")) { // displays large size warnings
		if (px == 32767) document.getElementById("warning").innerHTML = "Large size warning: cannot display more than a 32,767px width on any device or browser. Cutting off at 32,767px.";
		else if (px > 8192) document.getElementById("warning").innerHTML = "Large size warning: will not display on some mobile devices and IE (internet explorer.)";
		else if (px > 4096) document.getElementById("warning").innerHTML = "Large size warning: will not display on some mobile devices.";
		else document.getElementById("warning").innerHTML = "";
	};
	document.getElementById("canvas").width = px;
	setup_canvas();
};
