var OriginalImage = null, CurrentImage = null;
function upload() {
    var can = document.getElementById("can");
    var upFile = document.getElementById("image");

    OriginalImage = new SimpleImage(upFile);
    OriginalImage.drawTo(can);
}
function makeGrey() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    for (var pixels of CurrentImage.values()) {
        var red = pixels.getRed();
        var green = pixels.getGreen();
        var blue = pixels.getBlue();
        var avg = (red + green + blue) / 3.0;
        pixels.setRed(avg);
        pixels.setBlue(avg);
        pixels.setGreen(avg);
    }
    var can1 = document.getElementById("can");
    CurrentImage.drawTo(can1);

}

function Sapital() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    var w = CurrentImage.getWidth();
    var h = CurrentImage.getHeight();
    for (var x = 1; x + 1 < w; ++x) {
        for (var y = 1; y + 1 < h; ++y) {
            var pixels = CurrentImage.getPixel(x, y);
            var red = 0, green = 0, blue = 0;
            for (var ty = -1; ty <= 1; ++ty) {
                for (var tx = -1; tx <= 1; ++tx) {
                    var Tempixel = OriginalImage.getPixel(x + tx, y + ty);
                    red += Tempixel.getRed();
                    blue += Tempixel.getBlue();
                    green += Tempixel.getGreen();

                }
            }
            var avg = (red + green + blue) / 9.0;
            pixels.setRed(avg);
            pixels.setBlue(avg);
            pixels.setGreen(avg);

        }

    }
    var can1 = document.getElementById("can");
    CurrentImage.drawTo(can1);
}
function truncate(value) {
    if (value < 0) value = 0;
    if (value > 255) value = 255;
    return value;
}
function ChangeBrightness() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    var rangevalue = document.getElementById("Brightness");
    var Brightness = rangevalue.value;
    for (pixels of CurrentImage.values()) {
        var green = pixels.getGreen();
        var blue = pixels.getBlue();
        var red = pixels.getRed();
        green = Number(green) + Number(Brightness);
        blue = Number(blue) + Number(Brightness);
        red = Number(red) + Number(Brightness);
        pixels.setRed(truncate(red))
        pixels.setBlue(truncate(blue));
        pixels.setGreen(truncate(green));

    }
    var can1 = document.getElementById("can");
    CurrentImage.drawTo(can1);


}

//SRC : https://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/


var Pallete = null;
var Palletsize = 2;
function palleteInitialize() {
    Pallete = new Array(Palletsize);
    var cval = 0;
    var incr = Number(256) / Number(Palletsize);
    for (var j = 0; j < Palletsize; ++j) {
        Pallete[j] = cval;
        cval += incr;
    }

}
function FindNearestFromPallete(value) {

    if (Pallete == null) palleteInitialize();
    var mindiff = 255 * 255;
    var idx = Palletsize - 1;
    for (var x = 0; x < Palletsize; ++x) {
        var t = Number(value) - Number(Pallete[x]);
        if (t * t < mindiff) {
            mindiff = t * t;
            idx = x;
        }

    }
    return Pallete[idx];

}
function Make_4_Bit() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    for (pixels of CurrentImage.values()) {
        var red = pixels.getRed();
        red = FindNearestFromPallete(red);
        var green = pixels.getGreen();
        green = FindNearestFromPallete(green);
        var blue = pixels.getBlue();
        blue = FindNearestFromPallete(blue);
        pixels.setBlue(blue);
        pixels.setGreen(green);
        pixels.setRed(red);
    }
    /*
    Code for Error Diffussion  .... but it increases image size 
   // thats why i Have disavbled this part of the code 

    var w = CurrentImage.getWidth();
    var h = CurrentImage.getHeight();
    for (var x = 1; x + 1 < w; ++x) {
        for (var y = 1; y + 1 < h; ++y) {
            var actualpixel = OriginalImage.getPixel(x, y);
            var copiedpixel = CurrentImage.getPixel(x, y);
            var RedError = actualpixel.getRed() - copiedpixel.getRed();
            var GreenError = actualpixel.getGreen() - copiedpixel.getGreen();
            var BlueError = actualpixel.getBlue() - copiedpixel.getBlue();
            var p1 = CurrentImage.getPixel(x + 1, y);
            var p2 = CurrentImage.getPixel(x - 1, y + 1);
            var p3 = CurrentImage.getPixel(x, y + 1);
            var p4 = CurrentImage.getPixel(x + 1, y + 1);
            p1.setGreen(truncate(Number(p1.getGreen()) + (7.0 / 16.0) * Number(GreenError)));
            p1.setRed(truncate(Number(p1.getRed()) + (7.0 / 16.0) * Number(RedError)));
            p1.setBlue(truncate(Number(p1.getBlue()) + (7.0 / 16.0) * Number(BlueError)));


            p2.setGreen(truncate(Number(p2.getGreen()) + (3.0 / 16.0) * Number(GreenError)));
            p2.setRed(truncate(Number(p2.getRed()) + (3.0 / 16.0) * Number(RedError)));
            p2.setBlue(truncate(Number(p2.getBlue()) + (3.0 / 16.0) * Number(BlueError)));


            p3.setGreen(truncate(Number(p3.getGreen()) + (5.0 / 16.0) * Number(GreenError)));
            p3.setRed(truncate(Number(p3.getRed()) + (5.0 / 16.0) * Number(RedError)));
            p3.setBlue(truncate(Number(p3.getBlue()) + (5.0 / 16.0) * Number(BlueError)));


            p4.setGreen(truncate(Number(p4.getGreen()) + (1.0 / 16.0) * Number(GreenError)));
            p4.setRed(truncate(Number(p4.getRed()) + (1.0 / 16.0) * Number(RedError)));
            p4.setBlue(truncate(Number(p4.getBlue()) + (1.0 / 16.0) * Number(BlueError)));


        }
    }
    */

    var can = document.getElementById("can");
    CurrentImage.drawTo(can);

}

function ChangeContrast() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    var rangevalue = document.getElementById("Contrast");
    var contrast = rangevalue.value;
    for (pixels of CurrentImage.values()) {
        var factor = (259 * (Number(contrast) + 255)) / (255 * (259 - Number(contrast)));
        var green = pixels.getGreen();
        var blue = pixels.getBlue();
        var red = pixels.getRed();
        green = Number(factor) * (Number(green) - 128) + 128;
        blue = Number(factor) * (Number(blue) - 128) + 128;
        red = Number(factor) * (Number(red) - 128) + 128;
        pixels.setRed(truncate(red))
        pixels.setBlue(truncate(blue));
        pixels.setGreen(truncate(green));

    }
    var can1 = document.getElementById("can");
    CurrentImage.drawTo(can1);
}

function GammaCorrction() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    var rangevalue = document.getElementById("Gamma");
    var gamma = rangevalue.value;
    for (var pixels of CurrentImage.values()) {
        var gammaCorrection = 1.00 / Number(gamma);
        var green = pixels.getGreen();
        var blue = pixels.getBlue();
        var red = pixels.getRed();
        red = Number(red) / 255.0;
        red = Math.pow(red, gammaCorrection);
        red = 255 * Number(red);
        green = Number(green) / 255.0;
        green = Math.pow(green, gammaCorrection);
        green = 255 * Number(green);
        blue = Number(blue) / 255.0;
        blue = Math.pow(blue, gammaCorrection);
        blue = 255 * Number(blue);
        pixels.setBlue(blue);
        pixels.setGreen(green);
        pixels.setRed(red);
    }
    var can1 = document.getElementById("can");
    CurrentImage.drawTo(can1);

}



function InverseColor() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!"); r
        return;
    }
    CurrentImage = new SimpleImage(OriginalImage.getWidth(), OriginalImage.getHeight());
    for (var pixels of OriginalImage.values()) {
        CurrentImage.setPixel(pixels.getX(), pixels.getY(), pixels);
    }
    for (var pixels of CurrentImage.values()) {
        pixels.setRed(255 - Number(pixels.getRed()));
        pixels.setBlue(255 - Number(pixels.getBlue()));
        pixels.setGreen(255 - Number(pixels.getGreen()));
    }
    var can = document.getElementById("can");
    CurrentImage.drawTo(can);
}


function ClearCanvas() {
    var can = document.getElementById("can");
    var context = can.getContext("2d");
    context.clearRect(0, 0, can.width, can.height);
}

function Restore() {
    if (OriginalImage == null) {
        alert("Please upload an Image first!");
        return;
    }
    ClearCanvas();
    var can1 = document.getElementById("can");
    OriginalImage.drawTo(can1);
}