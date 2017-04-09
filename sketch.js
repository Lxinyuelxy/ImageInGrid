var showImg;
var img = new Image();
img.src = './Image/6.jpg';
var imgWidth, imgHeight;
var rows,cols;
var grid = [];
var sideOfGrid;

function Grid(originsizeOfGrid,startX,startY){
	this.w = originsizeOfGrid.w;
	this.h = originsizeOfGrid.h;
	this.startX = startX;
	this.startY = startY;
}

function setup() {
	showImg = document.getElementById("showImg");
	sideOfGrid = 30;
	imgWidth = img.width;
	imgHeight = img.height;
	rows = Math.ceil(imgHeight / sideOfGrid);
	cols = Math.ceil(imgWidth / sideOfGrid);
	
	for(var i = 0; i < rows; i++){
		grid[i] = [];
		for(var j = 0; j < cols; j++){
			var originsizeOfGrid = getOriginSizeOfGrid(i, j);
			grid[i][j] = new Grid(originsizeOfGrid, 0, 0);
		}
	}

	console.log("showImg.height = " + img.height);
	console.log("showImg.width = " + img.width);
	console.log("rows = " + rows);
	console.log("cols = " + cols);
}

function draw() {	
	clear();
     if (showImg.getContext) {
		var ctx = showImg.getContext('2d');
		ctx.canvas.width =  img.width;
		ctx.canvas.height = img.height;
		drawImg(ctx);
		drawLine(ctx);	   
    }
}

function drawImg(ctx) {
	var w = 0, h = 0;
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols - 1; j++) {
			if(0 === j) {
				w = 0;
			}
			else {
				w = w + grid[i][j-1].w;
			}
			grid[i][j].startX = w;
		}
		grid[i][cols - 1].startX = imgWidth - grid[i][cols - 1].w;
	}
		  
	for(var j = 0; j < cols; j++){
		for(var i = 0; i < rows - 1; i++){		
			if(0 == i){
				h = 0;
			}else{
				h = h + grid[i-1][j].h;
			}
			grid[i][j].startY = h;
		}
		grid[rows - 1][j].startY = imgHeight - grid[rows - 1][j].h;
	}
	
	var originStartX = 0, originstartY = 0;
	for(var i = 0; i < rows; i++){
		originStartX = 0;
		for(var j = 0; j < cols; j++){
			var originsizeOfGrid = getOriginSizeOfGrid(i, j);

			ctx.drawImage(
				img, 
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

function getOriginSizeOfGrid(i, j) {
	if(i === rows-1 && j === cols-1)
		return {
			w: imgWidth % sideOfGrid, 
			h: imgHeight % sideOfGrid };
	if(i === rows-1) 
		return {
			w: sideOfGrid, 
			h: imgHeight % sideOfGrid };
	if(j == cols - 1)
		return {
			w: imgWidth % sideOfGrid,
			h: sideOfGrid };
	else
		return { w: sideOfGrid, h: sideOfGrid };
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

function mousePressed(){
	
	var changed = [-1, 1, -2, 2, 0.5, -0.5];
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			var index = Math.floor((Math.random()*10) % changed.length);
			changeGridSize(i, j, changed[index]);

			console.log("Grid["+i+"]["+j+"].w = " + grid[i][j]. w);
		}
	}
	to_image();
} 

function changeGridSize(i, j, changed){
	grid[i][j].w = grid[i][j].w + changed;
	grid[i][j].h = grid[i][j].h + changed;
}

function to_image() {
	var canvas = document.getElementById("showImg");
	Canvas2Image.saveAsPNG(canvas, imgWidth, imgHeight);
}