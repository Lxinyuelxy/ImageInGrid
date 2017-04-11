window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
    if (!files.length);
    else {
        img.src = window.URL.createObjectURL(files[0]);
        changeSizeOfUploadImg();
        img.onload = function() {
            window.URL.revokeObjectURL(this.src);
        }  
    }
}

document.getElementById('enterImgURL').addEventListener('keydown', function (evt) {
    if (evt.keyCode == 13) {
        var url = document.getElementById('enterImgURL').value;
        img.src = url;
        changeSizeOfUploadImg();
    } 
}, false);

function changeSizeOfUploadImg() {
    if(img.width >= innerWidth || img.height >= innerHeight) { //若图片超出屏幕,应该对图片压缩
    } 
    console.log("img.width = " + img.width);
    console.log("img.height = " + img.height);
    console.log("innerWidth = " + innerWidth);
    console.log("innerHeight = " + innerHeight);
}