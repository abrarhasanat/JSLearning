
/*
//Green Screen 
var fgImage = new SimpleImage("");
var bgImage = new SimpleImage("");
var output = new SimpleImage(bgImage.getWidth(), bgImage.getHeight());
for (var pixels of fgImage.values()) {
    if (pixels.getGreen() > pixels.getBlue() + pixels.getRed()) {
        var x = pixels.getX();
        var y = pixels.getY();
        var bgPixel = bgImage.getPixel(x, y);
        output.setPixel(x, y, bgPixel);
    }
    else {
        output.setPixel(pixels);
    }
}
*/


// Eventdriven 
function dochange() {
    alert('clicked');

}
var text = "press ok to confirm ";
var pass = true;
function OkorCancel() {
    var choice = confirm(text);
    if (choice != true) {
        if (pass == true) {
            text = "Are you sure to cancel ? ";
            pass = false;
            OkorCancel();
        }
        else {
            text = "press ok to confirm ";
            pass = true;
            OkorCancel();
        }
    }
    else {
        alert('thank you');
    }

}
function fun() {
    var class1 = document.getElementById("div1");
    var class2 = document.getElementById("div2");
    var class3 = document.getElementById("div3");
    class1.className = "black";
    class2.className = "red";
    class3.className = "orange";
}


function colorchange() {
    var can1 = document.getElementById("d1");
    can1.style.backgroundColor = "lime";
}

function addText() {


    var can1 = document.getElementById("d1");
    can1.style.backgroundColor = "blue";
    var context = can1.getContext("2d");
    context.fillStyle = "yellow"
    context.fillRect(10, 10, 60, 60);
    context.fillRect(80, 10, 60, 60);
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Hello", 15, 45);

}
function doclear() {
    var can1 = document.getElementById("d1");
    var context = can1.getContext("2d");
    context.clearRect(10, 10, 60, 60);
    context.clearRect(80, 10, 60, 60);
    can1.style.backgroundColor = "yellow";
}

function doColor() {
    var can1 = document.getElementById("d2");
    var colorpicker = document.getElementById("clr");
    can1.style.backgroundColor = colorpicker.value;


}
function doSquare() {
    var can1 = document.getElementById("d2");
    var sldr = document.getElementById("sldr");
    var size = sldr.value;
    var context = can1.getContext("2d");
    context.clearRect(0, 0, can1.width, can1.height);
    context.fillStyle = "yellow";
    context.fillRect(10, 10, size, size);
}
var img = null;
function upload() {
    var can = document.getElementById("d1");
    var upFile = document.getElementById("finput");
    var context = can.getContext("2d");
    img = new SimpleImage(upFile);
    img.drawTo(can);

}
function makegrey() {
    if (img == null) return;
    alert("we are working on it");
    var can1 = document.getElementById("d1");
    for (var pixels of img.values()) {
        var red = pixels.getRed();
        var green = pixels.getGreen();
        var blue = pixels.getBlue();
        var avg = (red + green + blue) / 3.0;
        pixels.setRed(avg);
        pixels.setBlue(avg);
        pixels.setGreen(avg);
    }
    img.drawTo(can1);

}
var bgImage = null, fgImage = null, outputImage = null;

function displayfg() {
    var can = document.getElementById("d3");
    var upFile = document.getElementById("fgimage");
    var context = can.getContext("2d");
    fgImage = new SimpleImage(upFile);
    fgImage.drawTo(can);
}
function displaybg() {
    var can = document.getElementById("d4");
    var upFile = document.getElementById("bgimage");
    bgImage = new SimpleImage(upFile);
    bgImage.drawTo(can);
}
var GreenThreshold;

function GreenScreen() {
    if (fgImage == null || bgImage == null) {
        if (fgImage == null) alert("Please upload a foreground image");
        else alert("Please upload a background image");
        return;
    }
    var can = document.getElementById("d3");
    var context = can.getContext("2d");
    context.clearRect(0, 0, can.width, can.height);
    outputImage = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
    for (var pixels of fgImage.values()) {
        var x = pixels.getX();
        var y = pixels.getY();
        if (pixels.getGreen() > GreenThreshold && x < bgImage.getWidth() && y < bgImage.getHeight()) {
            var px = bgImage.getPixel(x, y);
            outputImage.setPixel(x, y, px);
        }
        else {
            outputImage.setPixel(x, y, pixels);
        }

    }
    outputImage.drawTo(can);


}

function setGreenThreshold() {
    var sldr = document.getElementById("green");
    GreenThreshold = sldr.value;
}