function to_image() {
    
	Canvas2Image.saveAsPNG(showImg, imgWidth, imgHeight);
}
document.getElementById('downloadImg').addEventListener('click', to_image);