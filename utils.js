// =====
// UTILS
// =====

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}


var g_score = { p1 : 0, p2 : 0 };

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

g_canvas.update = function () {
    this.width = window.innerWidth - 5;
    this.height = window.innerHeight - 5;
}

g_canvas.render = function (ctx) {
	ctx.save();

	ctx.fillStyle = "red";
	ctx.fillRect(this.width / 2, 0, this.width / 150, this.height);

	ctx.fillStyle = "rgba(255,0,0,0.5)";
	var textSize = this.height / 8;
	ctx.font = textSize+"pt Calibri bold";
	ctx.textAlign = "center";
	ctx.fillText(g_score.p1, this.width / 4, this.height / 2);
	ctx.fillText(g_score.p2, this.width / 4 * 3, this.height / 2);

	ctx.restore();
}

g_canvas.update();