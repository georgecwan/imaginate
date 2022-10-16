import replicate
from dotenv import load_dotenv

load_dotenv()

model = replicate.models.get("stability-ai/stable-diffusion")

"""
https://replicate.com/stability-ai/stable-diffusion

Predict parameters:
prompt: str
width: int
height: int

*** MAX WIDTH & HEIGHT IS 1024x768 ***

init_image: file handle or URL
mask: file handle or URL
prompt_strength: float [0, 1]
num_outputs: int
num_inference_steps: int
guidance_scale: float
"""


# Tests
if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    out = model.predict(prompt="an astronaut riding a horse on mars")

    print(out[0])
