from fetcher import fetch_ai_news
from utils import save_as_markdown

if __name__ == "__main__":
    print("Fetching AI news...")
    ai_news = fetch_ai_news()
    print(f"Found {len(ai_news)} articles published in the last 12 hours.")
    
    if ai_news:
        print("Saving articles as Markdown files...")
        for news in ai_news:
            save_as_markdown(news)
        print("All articles saved!")
    else:
        print("No articles found in the last 12 hours.")
