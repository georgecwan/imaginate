const sourceImage = document.getElementById("sourceImage");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const canvasContainer = document.getElementById("canvasContainer");

function updateDimensions() {
  const width = sourceImage.clientWidth;
  const height = sourceImage.clientHeight;
  console.log("width: " + width + " height: " + height);

  const aspect = width / height;

  if (width > 1024) {
    canvas.width = 1024;
    canvas.height = 1024 / aspect;
  }
  if (height > 768) {
    canvas.height = 768;
    canvas.width = 768 * aspect;
  }
  canvasContainer.style.aspectRatio = aspect.toString();

  canvas.width = width;
  canvas.height = height;
}
updateDimensions();
sourceImage.addEventListener("resize", updateDimensions);