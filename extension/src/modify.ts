const parentElement = <HTMLDivElement>document.getElementById("parent");
const sourceImage = <HTMLImageElement>document.getElementById("sourceImage");
const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const context = canvasElement.getContext("2d");
const canvasContainer = <HTMLDivElement>(
  document.getElementById("canvasContainer")
);

const setDimensions = () => {
  const originalWidth = sourceImage.clientWidth;
  const originalHeight = sourceImage.clientHeight;
  const aspect = originalWidth / originalHeight;

  const width = parentElement.clientWidth;
  const height = width / aspect;

  canvasContainer.style.width = `${width}px`;
  canvasContainer.style.height = `${height}px`;
  canvasElement.width = width;
  canvasElement.height = height;
};

setDimensions();
window.onresize = () => {
  setDimensions();
};

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

interface Body {
  prompt: string;
  prompt_strength: number;
  init_image: string;
  mask: string;
}

export const BACKEND_URL = "http://127.0.0.1:5000";

export const generateImage = async (body: Body) => {
  const res = await fetch(`${BACKEND_URL}/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

const submitButton = <HTMLButtonElement>document.getElementById("submit");
submitButton.addEventListener("click", async () => {
  const init_image = sourceImage.src;
  const mask = canvasElement.toDataURL("image/png");
  const prompt = (<HTMLInputElement>document.getElementById("prompt")).value;
  const prompt_strength = 0.5;

  const res = await generateImage({
    init_image,
    mask,
    prompt,
    prompt_strength,
  });
  console.log(res);
});

// Load the proper image from extension storage
chrome.storage.local.get(['urlList'], ({urlList}) => {
  const index = (new URL(window.location.href)).searchParams.get('index');
  if (index) {
    sourceImage.src = urlList[parseInt(index)];
    canvasContainer.style.backgroundImage = `url(${urlList[parseInt(index)]})`;
  }
})