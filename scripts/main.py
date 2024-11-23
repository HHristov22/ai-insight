from fetcher import fetch_ai_news
from utils import save_as_markdown, delete_old_markdown_files

if __name__ == "__main__":
    print("Fetching AI news...")
    ai_news = fetch_ai_news()
    print(f"Found {len(ai_news)} articles published.")
    
    if ai_news:
        print("Saving articles as Markdown files...")
        for news in ai_news:
            save_as_markdown(news)
        print("All articles saved!")
    else:
        print("No articles found.")
    
    print("Deleting old articles...")
    delete_old_markdown_files()  # Извикване на функцията за триене
    print("Old articles deleted (if any were older than 1 month).")