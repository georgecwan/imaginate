interface Body {
  prompt: string;
  prompt_strength: number;
  init_image: string;
  mask: string;
  width: number;
  height: number;
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
