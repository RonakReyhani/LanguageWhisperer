from transformers import Tool
from wikiDic import get_word_page_content

class SearchWordInWikiDictionary(Tool):
    name = "wiki_dictionary_searcher"
    description = ("This is a tool that searches a word meaning in Wiki dictionary. It takes a word as input, and returns the content of a word page.")

    inputs = ["text"]
    outputs = ["text"]

    def __call__(self, word):
        return print(get_word_page_content(word))

search_tool = SearchWordInWikiDictionary()