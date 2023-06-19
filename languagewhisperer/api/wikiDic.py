import requests
from bs4 import BeautifulSoup

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
