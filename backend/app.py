from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import cross_origin
import replicate

load_dotenv()

app = Flask(__name__)
model = replicate.models.get("stability-ai/stable-diffusion")


@app.route("/")
def hello_world():  # put application's code here
    return "Hello World!"


@app.route("/process", methods=["POST"])
@cross_origin()
def modify_image():
    body = request.json
    res = model.predict(
        num_outputs=1,
        prompt=body["prompt"],
        init_image=body["init_image"],
        prompt_strength=body["prompt_strength"],
        mask=body["mask"],
    )
    return {"output": res}


# @app.after_request
# def after_request(response):
#     response.headers.set("Access-Control-Allow-Origin", "*")
#     response.headers.set("Access-Control-Allow-Headers", "content-type")
#     return response


if __name__ == "__main__":
    app.run()
