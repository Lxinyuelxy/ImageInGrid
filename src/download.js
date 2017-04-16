
document.getElementById('downloadImg').addEventListener('click', function(){
	Canvas2Image.saveAsPNG(showImg, imgWidth, imgHeight);
});