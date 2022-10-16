const sourceImage = <HTMLImageElement>document.getElementById("sourceImage");
const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const context = canvasElement.getContext("2d");
const canvasContainer = <HTMLDivElement>(
  document.getElementById("canvasContainer")
);

const computeDimensions = () => {
  const originalWidth = sourceImage.clientWidth;
  const originalHeight = sourceImage.clientHeight;

  console.log("originalWidth", originalWidth);
  console.log("originalHeight", originalHeight);

  const aspect = originalWidth / originalHeight;

  // Make this image fit into a box that is 768px by 768px
  const maxLength = 768;

  // If the image is wider than it is tall
  if (aspect > 1) {
    return {
      width: maxLength,
      height: maxLength / aspect,
    };
  } else {
    // If the image is taller than it is wide
    return {
      width: maxLength * aspect,
      height: maxLength,
    };
  }
};

const { height, width } = computeDimensions();

canvasContainer.style.width = `${width}px`;
canvasContainer.style.height = `${height}px`;

canvasElement.width = width;
canvasElement.height = height;

// TODO: New one

const clearButton = <HTMLButtonElement>document.getElementById("clear");
clearButton.onclick = () => {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

const exportButton = <HTMLButtonElement>document.getElementById("export");
exportButton.onclick = () => {
  const img = canvasElement.toDataURL("image/png");
  console.log(img);
};

const sizeElement = <HTMLInputElement>document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e: any) => {
  size = e.target.value;
};

const clearElement = document.getElementById("clear");
clearElement.onclick = () => {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

let isDrawing;

const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
};

canvasElement.onmousedown = (e) => {
  isDrawing = true;
  context.beginPath();
  context.lineWidth = parseInt(size);
  context.lineJoin = "round";
  context.lineCap = "round";
  const { x, y } = getMousePos(canvasElement, e);
  context.moveTo(x, y);
};

canvasElement.onmousemove = (e) => {
  const { x, y } = getMousePos(canvasElement, e);

  if (isDrawing) {
    context.lineTo(x, y);
    context.stroke();
  }
};

canvasElement.onmouseup = function () {
  isDrawing = false;
  context.closePath();
};
