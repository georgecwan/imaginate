const parentElement = <HTMLDivElement>document.getElementById("parent");
const sourceImage = <HTMLImageElement>document.getElementById("sourceImage");
const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const context = canvasElement.getContext("2d");
const canvasContainer = <HTMLDivElement>(
    document.getElementById("canvasContainer")
);

function isCanvasBlank(canvas) {
  return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
}

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

sourceImage.addEventListener("load", () => {
  setDimensions();
});
window.addEventListener("resize", () => {
  setDimensions();
});

const clearButton = <HTMLButtonElement>document.getElementById("clear");
clearButton.onclick = () => {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

const exportButton = <HTMLButtonElement>document.getElementById("export");
function setTransparentToWhite() {
  const img = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
  const {data} = img;
  const {length} = data;
  for (let i = 0; i < length; i += 4) {
    const a = data[i + 3];
    if (a === 0) {
      // set to white
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }
  // Copy the new image data to a new canvas
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvasElement.width;
  newCanvas.height = canvasElement.height;
  const newContext = newCanvas.getContext("2d");
  newContext.putImageData(img, 0, 0);
  return newCanvas.toDataURL("image/png");
  // context.putImageData(img, 0, 0);
}

exportButton.onclick = () => {
  console.log(setTransparentToWhite());
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
  const rect = canvas.getBoundingClientRect();
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
  const {x, y} = getMousePos(canvasElement, e);
  context.moveTo(x, y);
};

canvasElement.onmousemove = (e) => {
  const {x, y} = getMousePos(canvasElement, e);

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

const strengthSlider = <HTMLInputElement>document.getElementById("promptStrength");
strengthSlider.addEventListener("input", () => {
  document.getElementById("strength").innerHTML = strengthSlider.value;
})

const submitButton = <HTMLButtonElement>document.getElementById("submit");
submitButton.addEventListener("click", async () => {
  const init_image = sourceImage.src;
  let mask;
  if (isCanvasBlank(canvasElement)) {
    mask = undefined;
  } else {
    mask = setTransparentToWhite();
  }

  const prompt = (<HTMLInputElement>document.getElementById("prompt")).value;
  const prompt_strength = parseInt((<HTMLInputElement>document.getElementById("promptStrength")).value) / 100;

  if (prompt === "") {
    const promptBox = <HTMLDivElement>document.getElementById("prompt");
    promptBox.style.border = "1px solid red";
    document.getElementById("prompt-label").innerHTML = "Please enter a prompt";
    return;
  } else {
    const promptBox = <HTMLDivElement>document.getElementById("prompt");
    promptBox.style.border = "none";
    document.getElementById("prompt-label").innerHTML = "";
  }
  (<HTMLImageElement>document.getElementById("loadingImg")).src = "images/loadingPulse.gif";
  document.getElementById("resultDiv").style.display = "none";

  const res = await generateImage({
    init_image,
    mask,
    prompt,
    prompt_strength,
  });
  console.log(res);
  const imageURL = res.output[0];
  (<HTMLImageElement>document.getElementById("loadingImg")).src = "";
  document.getElementById("resultDiv").style.display = "block";
  (<HTMLImageElement>document.getElementById("resultDiv").children[1]).src = imageURL;
});

// Load the proper image from extension storage
chrome.storage.local.get(['urlList'], ({urlList}) => {
  const index = (new URL(window.location.href)).searchParams.get('index');
  if (index) {
    sourceImage.src = urlList[parseInt(index)];
    canvasContainer.style.backgroundImage = `url(${urlList[parseInt(index)]})`;
  }
});