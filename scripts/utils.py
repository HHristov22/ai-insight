import os
from datetime import datetime, timedelta
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

    # # Get the current date
    # current_date = datetime.now()
    # # Format the date as YYYY-MM-DD
    # formatted_date = current_date.strftime("%Y-%m-%d")

    filename = f"{news.published}_{news.title[:50].replace(' ', '_').replace(':', '_').replace('__', '_').replace('/', '')}.md"
    # print(news.published)
    with open(os.path.join(NEWS_DIR, filename), "w", encoding="utf-8") as file:
        file.write(news.to_markdown())
    print(f"Saved: {filename}")

def delete_old_markdown_files():
    """
    Deletes Markdown files in the NEWS_DIR directory whose names start
    with a date older than 1 month from today (YYYY_MM_DD format).
    """
    if not os.path.exists(NEWS_DIR):
        print("Directory does not exist.")
        return

    # Calculate the threshold date (1 month ago)
    one_month_ago = datetime.now() - timedelta(days=31)

    for filename in os.listdir(NEWS_DIR):
        # Check if the file name starts with a date in YYYY_MM_DD format
        if filename.endswith(".md") and filename[:10].count('_') == 2:
            try:
                file_date = datetime.strptime(filename[:10], "%Y_%m_%d")
                # Check if the file date is older than 1 month
                if file_date < one_month_ago:
                    os.remove(os.path.join(NEWS_DIR, filename))
                    print(f"Deleted: {filename}")
            except ValueError:
                # Skip files that don't have a valid date format
                pass