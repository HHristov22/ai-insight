import os
from datetime import datetime
from newspaper import Article

NEWS_DIR = "news"

def extract_article_content(url):
    """
    Fetches article content from a URL.
    """
    try:
        article = Article(url)
        article.download()
        article.parse()
        if len(article.text.strip()) == 0:
            return None
        return article.text
    except Exception as e:
        print(f"Error extracting content from {url}: {e}")
        return None

def save_as_markdown(news):
    """
    Saves an object of type News as a Markdown file.
    """
    if not os.path.exists(NEWS_DIR):
        os.makedirs(NEWS_DIR)

    filename = f"{news.title[:50].replace(' ', '_').replace(':', '_').replace('__', '_').replace('/', '')}.md"
    with open(os.path.join(NEWS_DIR, filename), "w", encoding="utf-8") as file:
        file.write(news.to_markdown())
    print(f"Saved: {filename}")
