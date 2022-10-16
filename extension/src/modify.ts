const width = document.getElementById("sourceImage").clientWidth;
const height = document.getElementById("sourceImage").clientHeight;
console.log("width: " + width + " height: " + height);

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = width;
canvas.height = height;