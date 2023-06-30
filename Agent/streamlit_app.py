import streamlit as st
#from transformers import HfAgent
from PIL import Image
import IPython
import string
from huggingface_hub import login
from gtts import gTTS
from IPython.display import Audio
import langcodes
from transformers import Tool
from transformers.tools import HfAgent
import IPython
import soundfile as sf
import getpass
import requests
from bs4 import BeautifulSoup

token = st.secrets["hugging_face_token"]
login(token)

# Adding tools to Agent
#Text voicing

def text_to_speech(text, lang):
    tts = gTTS(text, lang=lang)
    tts.save('output.mp3')
    return Audio('output.mp3', autoplay=True)

# Custom text voicing tool

class VoicingInDifferentLanguages(Tool):
    name = "google_voicing_multiple_languages"
    description = ("This is a tool that can voice a word or a phrase in a given language. It takes a text and language as input, and returns the audio.")

    inputs = ["text", "text"]
    outputs = ["audio"]

    def __call__(self, text, language):
        return text_to_speech(text, language)


#WIKI SEARCHER
def get_word_page_url(word):
    # Define the base URL for the Wiktionary API
    base_url = "https://en.wiktionary.org/w/api.php"

    # Define the parameters for the API request
    params = {
        "action": "query",
        "format": "json",
        "titles": word,
        "prop": "info",
        "inprop": "url"
    }

    # Send the API request
    response = requests.get(base_url, params=params)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract the word page URL from the API response
        data = response.json()
        pages = data["query"]["pages"]
        page_id = next(iter(pages))  # Get the first (and only) page ID
        page_info = pages[page_id]
        page_url = page_info["fullurl"]
        return page_url
    else:
        print("Error connecting to the API. Please check your network connection or try again later.")
        return None


def get_word_page_content(word):
    # Retrieve the URL of the word page
    page_url = get_word_page_url(word)

    if page_url:
        # Send a GET request to the word page URL
        response = requests.get(page_url)

        # Check if the request was successful
        if response.status_code == 200:
            # Extract the content from the response using Beautiful Soup
            soup = BeautifulSoup(response.content, "html.parser")
            content_div = soup.find("div", {"id": "mw-content-text"})
            page_content = content_div.get_text()
            return page_content.strip()
        else:
            print("Error connecting to the word page. Please check your network connection or try again later.")
            return None
    else:
        return None


# Custom WIKI searcher tool
class SearchWordInWikiDictionary(Tool):
    name = "wiki_dictionary_searcher"
    description = ("This is a tool that searches a word meaning in Wiki dictionary. It takes a word as input, and returns the content of a word page.")

    inputs = ["text"]
    outputs = ["text"]

    def __call__(self, word):
        return get_word_page_content(word)
tool = SearchWordInWikiDictionary()
voicing_tool = VoicingInDifferentLanguages()

agent = HfAgent("https://api-inference.huggingface.co/models/bigcode/starcoder", additional_tools=[tool, voicing_tool])


def play_audio(audio):
    sf.write("speech_converted.wav", audio.numpy(), samplerate=16000)
    return IPython.display.Audio("speech_converted.wav")
uploaded_photos=st.file_uploader("Choose a file")

def get_session_state():
    return st.session_state

# Initialize session state
session_state = get_session_state()
if 'what_on_my_photo' not in session_state:
    session_state.what_on_my_photo = None
if 'translated_caption' not in session_state:
    session_state.translated_caption = None


image=None
what_on_my_photo=None

if (uploaded_photos!=None):
    image = Image.open(uploaded_photos)

if (image!=None):
    st.image(image)

if (image!=None):
  what_on_my_photo = agent.run("Generate a caption for the 'image'", image=image)
  session_state.what_on_my_photo = what_on_my_photo

if (what_on_my_photo!=None):
  st.write(what_on_my_photo)

option = st.selectbox('Select Language to translate to',('Spanish', 'German', 'French', 'Italian', 'Japanese',
                               'Acehnese', 'Afrikaans', 'Akan', 'Amharic', 'Armenian', 'Assamese', 'Asturian', 'Awadhi', 'Aymara', 'South Azerbaijani', 'North Azerbaijani',
                               'Bashkir', 'Bambara', 'Balinese', 'Banjar', 'Basque', 'Belarusian', 'Bemba', 'Bengali', 'Bhojpuri', 'Bosnian', 'Buginese', 'Bulgarian',
                               'Catalan', 'Cebuano', 'Central Kurdish', 'Chhattisgarhi', 'Chokwe', 'Crimean Tatar', 'Croatian', 'Czech', 'Danish', 'Dholuo', 'Dinka', 'Dyula',
                               'Dzongkha', 'Esperanto', 'Estonian',  'Ewe', 'Faroese', 'Fijian', 'Finnish', 'Fon', 'Friulian', 'Fulfulde',
                               'Ganda', 'Galician', 'Guarani', 'Gujarati', 'Georgian', 'Greek', 'Haitian Creole', 'Hausa', 'Hebrew', 'Hindi', 'Hungarian', 'Iranian Persian',
                               'Icelandic', 'Igobo', 'IIocano', 'Indonesian', 'Irish', 'Javanese',  'Kabyle', 'Kachin', 'Kamba', 'Kannada', 'Kashmiri',
                               'Kanuri', 'Kazakh', 'Kabiye', 'Khmer', 'Kikuyu', 'Kinyarwanda', 'Kimbundu', 'Konga', 'Korean', 'Kurdish', 'Kyrgyz',
                               'Lao', 'Latvian', 'Ligurian', 'Limburgish', 'Lingala', 'Lithuanian', 'Lombard', 'Latgalian', 'Luxembourgish', 'Luba-Kasai', 'Mizo',
                               'Tibetan', 'Thai', 'Scottish Gaelic', 'Swedish', 'Welsh'))

translate="Can you tranlate \'caption\' to" + option
language_code = str(langcodes.find(option))
translated_caption=None

if(session_state.what_on_my_photo!=None):
  if st.button('Translate'):
    translated_caption = agent.run(translate, caption=what_on_my_photo)
    session_state.translated_caption = translated_caption

if(session_state.translated_caption!=None):
    st.subheader(session_state.translated_caption)



if(session_state.translated_caption!=None):
    column = st.columns(1)
    if column[0].button('Get pronunciation'):
        voicing = agent.run("Get voicing of 'text' in 'lang'",
                             text=session_state.translated_caption, lang=language_code)
        if(voicing!=None):
            st.write(voicing)


words = None
if(session_state.translated_caption!=None):
    translator = str.maketrans("", "", string.punctuation)
    sentence_without_punctuation = session_state.translated_caption.translate(translator)
    words = sentence_without_punctuation.split()
    button_states = {}

if words:
    for index, word in enumerate(words):
        if word not in button_states:
            button_states[word] = {"wikipedia": False, "pronunciation": False}

        st.subheader(word)
        col1, col2 = st.columns(2)

        with col1:
            button_key = f"wikipedia_{word}_{index}"
            button_label = f"Search meaning on Wikipedia ({word})"
            button_states[word]["wikipedia"] = st.button(button_label, key=button_key)

            if button_states[word]["wikipedia"]:
                page_content=None
                page_content = agent.run("Search a meaning of "+ word +" in wiki", word=word)
                if(page_content!=None):
                    st.write(page_content)

        with col2:
            button_key = f"pronunciation_{word}_{index}"
            button_label = f"Get voice pronunciation ({word})"
            button_states[word]["pronunciation"] = st.button(button_label, key=button_key)

            if button_states[word]["pronunciation"]:
                audio = agent.run("Get voicing of 'text' in 'lang'", text=word, lang=language_code)
                if(audio!=None):
                    st.write(audio)