from flask import Flask,request
import json
from setupAgent import config_agent
from playAudio import play_audio
from flask_cors import CORS
from PIL import Image
import io
import base64

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
agent = config_agent()

@app.route("/api/generate-caption",methods=['POST'])
def generate_captions():
    data = request.get_json()
    response = data['image']
    bytes_decoded = base64.b64decode(response)
    img = Image.open(io.BytesIO(bytes_decoded))
    try:
      return agent.run("Generate a caption for the 'image'", image=img , max_new_tokens=500)
    except Exception as e:
      print(e)
    
    
@app.route("/api/generate-audio",methods=['POST'])
def generate_audio():
  data = request.get_json()
  caption = data['caption']
  try: 
    audio = agent.run("Read out loud the 'translated_sentence'", translated_sentence=caption)
    return audio
  except Exception as e:
    print(e)

@app.route("/api/translate",methods=['POST'])
def translate_captions():
    try:
      data = request.get_json()
      print(data)
      target_language = data['language']
      caption = data['caption']
      return agent.run(f"Can you translate 'caption' to {target_language}?", caption=caption)
    except Exception as e:
      print(e)

@app.route("/api/generate-etymology", methods=['POST'])
def generate_etymology():
  try:
    data = request.get_json()
    string = data["translation"]
    converted_to_list_caption = string.split()
    for word in converted_to_list_caption:
      wiki = agent.run(f"Search a meaning of '{word}' in wiki")
      return {wiki, word}
  except Exception as e:
      print(e)