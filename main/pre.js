var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function Point(x = 0, y = 0) {
	this.x = x,this.y = y;
}
function Chess(name, locx, locy, color) {
	this.name = name, this.loc = new Point(locx, locy);
	this.color = color;
}
function ChessSet(color) {
	this.piece = [];
	this.color = color;
}
var red = new ChessSet("red");
var black = new ChessSet("black");
var redName = ["車", "馬", "相", "仕", "帥"];
var blackName = ["車", "馬", "象", "士", "將"];
Chess.prototype.draw = function() {
	var cur = new Point(70 * this.loc.x, 70 * this.loc.y);
	ctx.beginPath();
	ctx.fillStyle = "yellow";
	ctx.arc(cur.x, cur.y, 35, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = this.color, ctx.font = "40px 楷体";
	ctx.textBaseline = "middle", ctx.textAlign = "center";
	ctx.fillText(this.name, cur.x, cur.y);
};
ChessSet.prototype.generate = function() {
	if (this.color == "red") {
		for (var i = 1; i <= 5; i++) {
			this.piece.push(new Chess(redName[i - 1], i, 10, "red"));
		}
		for (var i = 6; i <= 9; i++) {
			this.piece.push(new Chess(redName[10 - i - 1], i, 10, "red"));
		}
		for (var i = 2; i <= 8; i += 6) {
			this.piece.push(new Chess("炮", i, 8, "red"));
		}
		for (var i = 1; i <= 9; i += 2) {
			this.piece.push(new Chess("兵", i, 7, "red"));
		}
	} else {
		for (var i = 1; i <= 5; i++) {
			this.piece.push(new Chess(blackName[i - 1], i, 1, "black"));
		}
		for (var i = 6; i <= 9; i++) {
			this.piece.push(new Chess(blackName[10 - i - 1], i, 1, "black"));
		}
		for (var i = 2; i <= 8; i += 6) {
			this.piece.push(new Chess("炮", i, 3, "black"));
		}
		for (var i = 1; i <= 9; i += 2) {
			this.piece.push(new Chess("卒", i, 4, "black"));
		}
	}
};
ChessSet.prototype.draw = function() {
	for (var i = 0; i < this.piece.length; i++) {
		this.piece[i].draw();
	}
};
function drawBoard() {
	function drawLine(begin, end) {
		ctx.beginPath();
		ctx.moveTo(begin.x, begin.y), ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}
	var curx, cury;
	var ul = new Point(70, 70), ur = new Point(630, 70);
	var dl = new Point(70, 700), dr = new Point(630, 700);
	drawLine(ul, ur), drawLine(dl, dr);
	drawLine(ul, dl), drawLine(ur, dr);
	for (var i = 2; i <= 9; i++) {
		curx = new Point(70, i * 70), cury = new Point(630, i * 70);
		drawLine(curx, cury);
	}
	for (var i = 2; i <= 8 ; i++) {
		curx = new Point(i * 70, 70), cury = new Point(i * 70, 350);
		drawLine(curx, cury);
		curx = new Point(i * 70, 420), cury = new Point(i * 70, 700);
		drawLine(curx, cury);
	}
};
function drawAll() {
	ctx.clearRect(0, 0, 1200, 1200);
	drawBoard(), red.draw(), black.draw();
}