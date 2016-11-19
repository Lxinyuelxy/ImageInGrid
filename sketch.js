var showImg;
var img = new Image();
img.src = 'Tiger.jpg';
var positionOnCanvas;
var rows,cols;
var grid = [];
var originsizeOfGrid;
var findY, findX;//标记鼠标停留在那个格子上


function Grid(originsizeOfGrid,startX,startY){
	this.w = originsizeOfGrid.w;
	this.h = originsizeOfGrid.h;
	this.startX = startX;
	this.startY = startY;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	showImg = document.getElementById("showImg");
	originsizeOfGrid = {w:30,h:30};
	rows = showImg.height / originsizeOfGrid.w;
	cols = showImg.width / originsizeOfGrid.h;
	
	for(var i = 0; i < rows; i++){
		grid[i] = [];
		for(var j = 0; j < cols; j++){
			grid[i][j] = new Grid(originsizeOfGrid,0,0);
		}
	}
}

function draw() {	
	clear();
    if (showImg.getContext) {
		var ctx = showImg.getContext('2d');
		drawImg(ctx);
		drawLine(ctx);	   
       }
}

function drawImg(ctx){
	var w = 0, h = 0;
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(0 == j){
				w = 0;
			}else{
				w = w + grid[i][j-1].w;
			}
			grid[i][j].startX = w;
		}
	}
		  
	for(var j = 0; j < cols; j++){
		for(var i = 0; i < rows; i++){		
			if(0 == i){
				h = 0;
			}else{
				h = h + grid[i-1][j].h;
			}
			grid[i][j].startY = h;
		}
	}
	
	var originStartX = 0, originstartY = 0;
	for(var i = 0; i < rows; i++){
		originStartX = 0;
		for(var j = 0; j < cols; j++){
			ctx.drawImage(img, 
			originStartX, 
			originstartY, 
			originsizeOfGrid.w, 
			originsizeOfGrid.h, 
			grid[i][j].startX, 
			grid[i][j].startY,
			grid[i][j].w,			
			grid[i][j].h);
			originStartX = originStartX + originsizeOfGrid.w;
		}
		originstartY = originstartY + originsizeOfGrid.h;
	}
}

function drawLine(ctx){
	ctx.strokeStyle = "rgba(255,255,255,0.3)";
	ctx.beginPath();
	for(var i = 0; i < rows; i++){
		originStartX = 0;
		for(var j = 0; j < cols; j++){
		    ctx.moveTo(grid[i][j].startX, grid[i][j].startY);
			ctx.lineTo(grid[i][j].startX + grid[i][j].w, grid[i][j].startY);
			
			ctx.moveTo(grid[i][j].startX, grid[i][j].startY);
			ctx.lineTo(grid[i][j].startX, grid[i][j].startY + grid[i][j].h);	
			
			ctx.moveTo(grid[i][j].startX + grid[i][j].w, grid[i][j].startY + grid[i][j].h);
			ctx.lineTo(grid[i][j].startX + grid[i][j].w, grid[i][j].startY);
			
			ctx.moveTo(grid[i][j].startX + grid[i][j].w, grid[i][j].startY + grid[i][j].h);
			ctx.lineTo(grid[i][j].startX, grid[i][j].startY + grid[i][j].h);
		}
	}
	ctx.stroke();
}

window.onmousemove = function(event){ 
    var canvas = event.target;  
    positionOnCanvas = getPointOnCanvas(canvas, event.pageX, event.pageY); 
	whichGrid();
}

function getPointOnCanvas(canvas, x, y) {  
    var box = canvas.getBoundingClientRect();  
    return { x: x - box.left * (canvas.width  / box.width), 
			 y: y - box.top  * (canvas.height / box.height)};  
}

function whichGrid(){
	var x = positionOnCanvas.x, y = positionOnCanvas.y;	
	var w = 0, h = 0;
	
	for(var i = 0; i < rows; i++){
		for(findY = 0; findY < cols; findY++){
			if(x < grid[i][findY].startX) break;
		}
		if(findY != cols) break;
	}
	findY = findY - 1;

	for(var j = 0; j < cols; j++){
		for(findX = 0; findX < rows; findX++){
			if(y < grid[findX][j].startY) break;
		}
		if(findX != rows) break;
	}
	findX = findX -1;
}

function mousePressed(){
	changeGridSize();
} 

function changeGridSize(){
	grid[findX][findY].w = grid[findX][findY].w + 1;
	grid[findX][findY].h = grid[findX][findY].h + 1;
}