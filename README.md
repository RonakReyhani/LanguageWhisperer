# LanguageWhisperer

We have a world full of different objects and images. And we are able to describe all that we see in our native language. But what if we want to learn a foreign language? That's where our tool, the LanguageWhisperer comes in. You can upload a picture of your choice and then generate a caption for it.

You can then translate the caption into a language of your choice. Afterwards you can listen to the pronunciation of the caption. Finally you are able to research the meaning of a selected word with our custom tool, the Wiki searcher.
For the implementation we have been using the StarCoder agent, which is a large language model (LLM) ( https://huggingface.co/docs/transformers/main_classes/agent ) that provides a natural language API on top of transformers. The Wiki Searcher has been implemented with the help of BeautifulSoup, a Python library for pulling data out of HTML and XML files.
This repo also contains our initial approach on developing our idea. initially we started with Vercel and NextJS. Things got a bit complex in terms on dependency managements and size of the files so that we ended up using Streamlit as a handy ML tool to present and implement our idea.
therefor, the UI of the application has been implemented with Streamlit.

## Demo video

https://youtu.be/zaYRAKcPHOk

## How to use:

Open a new Google colab notebook. https://colab.research.google.com/?utm_source=scs-index .Copy in the code that you find in the folder Agent/Streamlit_integration_LanguageWhisperer.ipynb
Run cell 1-3. If you don’t have a HuggingFace account yet, create one and copy your Token into the input field shown after a while in cell 3. Run cells 4-7.
In cell 7, open the URL once that it is shown.
At the left side of the Google colab notebook, click on the folder icon. Open the file log.txt, copy the ip of “external url” without port and chars e.g. 35.229.184.198. Paste it in the input field of the URL you opened and click on “click to submit”.

You can then upload a picture. The caption will get shown after a while. Afterwards, choose a language to translate the caption. Then in the input section “Enter a word” you can research about a certain word in Wikipedia. The text will be shown below the input section after a moment.
