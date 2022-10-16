const sourceImage = <HTMLImageElement>document.getElementById("sourceImage");
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const canvasContainer = <HTMLDivElement>(
  document.getElementById("canvasContainer")
);

const computeDimensions = () => {
  const originalWidth = sourceImage.naturalWidth;
  const originalHeight = sourceImage.naturalHeight;

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
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
