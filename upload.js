document.getElementById('uploadImg').addEventListener('click', function () {
    if (window.File && window.FileReader && window.FileList && window.Blob) ;
    else {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    var files = evt.target.files; // FileList object
    var f = files[0];
    if (!f.type.match('image.*')) {
        return;
    }

    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            img.src = e.target.result;
        };
    })(f);
    reader.readAsDataURL(f);
}, false);

document.getElementById('enterImgURL').addEventListener('keydown', function (evt) {
    if (evt.keyCode == 13) {
        var url = document.getElementById('enterImgURL').value;
        img.src = url;
    } 
}, false);
