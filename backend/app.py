from flask import Flask, request
from dotenv import load_dotenv
import replicate
import base64
import tempfile

load_dotenv()

app = Flask(__name__)
model = replicate.models.get("stability-ai/stable-diffusion")


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/process', methods=['POST'])
def modify_image():
    body = request.json
    mask = base64.b64decode(body["mask"][22:])

    with tempfile.TemporaryFile() as fp:
        fp.write(mask)
        fp.seek(0)
        res = model.predict(
            prompt=body["prompt"],
            init_image=body["init_image"],
            prompt_strength=body["prompt_strength"],
            mask=fp,
            num_outputs=1
        )
        return {
            "response": res
        }


if __name__ == '__main__':
    app.run()
