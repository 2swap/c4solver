var canvas = document.getElementById('ctx');
var chatbox = document.getElementById('chat');
var ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;

var board = "Uninitialized";
resetBoard();

var cols = ['#ff0000','#ffffff','#ffff00'];
var selectedColor = -1, moveNumber = 1;

var mx = my = mb = 0; // Mouse coordinates and button

var stoneWidth = 40;
var boardMarg = stoneWidth/2;
var boardWidth = stoneWidth*7;
var boardHeight = stoneWidth*6;
var rbx = w/2-boardWidth/2, rby = h/2-boardHeight/2; 

var tick = 0;

telegrama(24);



//board manipulation
function resetBoard(){
	board = [[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0]];
}



//intervals
setInterval(function(){
	w = window.innerWidth;
	h = window.innerHeight;
	if(canvas.width != w || canvas.height != h){
		canvas.width = w;
		canvas.height = h;
	}
	render();
	tick++;
},10);



//rendering
function render() {
	rBackground();
	rBoard();
	rResetButton();
	rFillTypes();
}
function rBackground() {
	ctx.fillStyle = "#dddddd";
	ctx.fillRect(0,0,w,h);
	
}
function rBoard(t){
	
	//render board outline
	ctx.fillStyle = "#0077ff";
	roundRect(rbx-boardMarg/2,rby-boardMarg/2,boardWidth+boardMarg,boardHeight+boardMarg,boardMarg);

	//render highlighted column
	var mouseHoverColumn = Math.floor((mx-rbx)/stoneWidth);
	ctx.fillStyle = "#0099ff";
	if(mouseHoverColumn >= 0 && mouseHoverColumn < 7&& my >= rby && my < rby + boardHeight)
		roundRect(rbx+mouseHoverColumn*stoneWidth,rby,stoneWidth,boardHeight,boardMarg);
	
	//render stones and numbers
	telegrama(20);
	for(var y = 0; y < 6; y++)
		for(var x = 0; x < 7; x++){
			//render stone
			var boardHere = board[5-y][x];
			ctx.fillStyle = cols[Math.sign(boardHere)+1];
			ctx.beginPath();
			ctx.arc(rbx+(x+.5)*stoneWidth, rby+(y+.5)*stoneWidth, stoneWidth*.4, 0, 2*Math.PI);
			ctx.fill();

			//render number
			ctx.textAlign = "center";
			ctx.fillStyle = "#000000";
			if(boardHere != 0)
				ctx.fillText(Math.abs(boardHere), rbx+(x+.5)*stoneWidth, rby+(y+.65)*stoneWidth);
		}

}
function rResetButton(){
	
}
function rFillTypes(){

}



//math
function lerp(a,b,w){
	return a*w+b*(1-w);
}
function cerp(a,b,w){
	return lerp(a,b,6*(w*w/2-w*w*w/3));
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//gfx
function roundRect(x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.arcTo(x+w, y,   x+w, y+h, r);
	ctx.arcTo(x+w, y+h, x,   y+h, r);
	ctx.arcTo(x,   y+h, x,   y,   r);
	ctx.arcTo(x,   y,   x+w, y,   r);
	ctx.closePath();
	ctx.fill();
}
function telegrama(x){
	ctx.font = x+"px Trebuchet MS";
}
function write(text, x, y, col, sz, align){
	ctx.save();
	if(col)   ctx.fillStyle = col;
	if(sz)    ctx.font = sz + "pt Telegrama";
	if(align) ctx.textAlign = align;
	ctx.fillText(text+"",x,y);
	ctx.restore();
}

document.addEventListener("mousemove",mouse);
document.addEventListener("mouseup",click);

function click(){
	var column = Math.floor((mx-rbx)/stoneWidth);
	var row = 0;
	while(board[row][column] != 0) {
		row++;
		if(row >= 6) {
			console.log("column full");
			return;
		}
	}
	if(column < 0 || column > 6 || my < rby || my > rby+boardHeight) {
		console.log("Clicked outside of board");
		return;
	}
	console.log("Clicked on column " + column);
	board[row][column] = selectedColor * moveNumber;
	selectedColor *= -1;
	moveNumber++;
}
function mouse(e){
	mx = e.clientX;
	my = e.clientY;
	mb = e.button;
}

