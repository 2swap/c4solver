var canvas = document.getElementById('ctx');
var chatbox = document.getElementById('chat');
var ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;

var board = [[0,0,0,0,0,0,1],
	     [0,0,0,0,-1,0,-1],
	     [0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0]];

var cols = ['#ff0000','#ffffff','#ffff00'];

var stoneWidth = 25;
var boardWidth = stoneWidth*7;
var boardHeight = stoneWidth*6;
var rbx = w/2-boardWidth/2, rby = h/2-boardHeight/2; 

var tick = 0;

telegrama();

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
}
function rBackground() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,w,h);
}
function rBoard(t){
	ctx.fillStyle = "#0077ff";
	ctx.fillRect(rbx,rby,boardWidth,boardHeight);
	for(var y = 0; y < 6; y++)
		for(var x = 0; x < 7; x++){
			ctx.fillStyle = cols[board[y][x]+1];
			ctx.beginPath();
			ctx.arc(rbx+(x+.5)*stoneWidth, rby+(y+.5)*stoneWidth, stoneWidth*.4, 0, 2*Math.PI);
			ctx.fill();
		}
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
function posToColor(x){
	return Math.floor(((x/mapSz)+.5)*235+20);
}

//gfx
function telegrama(){
	ctx.font = "18px Telegrama";
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
document.addEventListener("mousedown",click);
document.addEventListener("keypress",function(){console.log("key");devMode ^= true;});

function click(){
	var column = (mx-rbx)/stoneWidth;
	var row = 0;
	board[row][column] = 0;
}
function mouse(e){
	mx = e.clientX;
	my = e.clientY;
	mb = e.button;
}

