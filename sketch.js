var showImg;
var img = new Image();
img.src = './Image/2.png';
var rows,cols;
var grid = [];
var originsizeOfGrid;


function Grid(originsizeOfGrid,startX,startY){
	this.w = originsizeOfGrid.w;
	this.h = originsizeOfGrid.h;
	this.startX = startX;
	this.startY = startY;
}

function setup() {
	//createCanvas(windowWidth, windowHeight);
	showImg = document.getElementById("showImg");
	originsizeOfGrid = {w:30,h:30};
	rows = img.height / originsizeOfGrid.w;
	cols = img.width / originsizeOfGrid.h;

	console.log("showImg.height = " + img.height);
	console.log("showImg.width = " + img.width);
	
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
		ctx.canvas.width =  img.width;
		ctx.canvas.height = img.height;
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

function mousePressed(){
	
	var changed = [-1, 1, -2, 2, 0.5, -0.5];
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			var index = Math.floor((Math.random()*10) % changed.length);
			console.log("index = " + index);
			changeGridSize(i, j, changed[index]);
		}
	}
} 

function changeGridSize(i, j, changed){
	grid[i][j].w = grid[i][j].w + changed;
	grid[i][j].h = grid[i][j].h + changed;
}