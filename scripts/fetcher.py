import feedparser
import time
from datetime import datetime, timedelta
from utils import extract_article_content
from news import News

rss_feeds = {
    'BBC Technology': 'http://feeds.bbci.co.uk/news/technology/rss.xml',
    'The Verge AI': 'https://www.theverge.com/rss/index.xml',
    'MIT Technology Review AI': 'https://www.technologyreview.com/feed/',
    'Wired AI': 'https://www.wired.com/feed/category/ai/latest/rss',
    'TechCrunch AI': 'http://feeds.feedburner.com/Techcrunch'
}

def fetch_ai_news():
    """
    Retrieves news from RSS feeds related to AI.
    """
    ai_keywords = [
        'artificial intelligence', 'machine learning', 'deep learning',
        'neural network', 'natural language processing', 'nlp', 'ml', 'dl',
        'computer vision', 'generative ai', 'large language model',
        'transformer model', 'openai', 'gpt', 'bard', 'nvidia', 'midjourney',
        'stability ai', 'data science', 'predictive analytics',
        'autonomous systems', 'robotics', 'ai ethics', 'ai bias', 'reinforcement learning'
    ]
    
    ai_news = []
    now = datetime.now()
    twelve_hours_ago = now - timedelta(hours=12)

    for source, url in rss_feeds.items():
        feed = feedparser.parse(url)
        for entry in feed.entries:
            published_time = None
            if hasattr(entry, 'published_parsed'):
                published_time = datetime.fromtimestamp(time.mktime(entry.published_parsed))
            
            if published_time and published_time >= twelve_hours_ago:
                if any(keyword in entry.title.lower() for keyword in ai_keywords) or ('AI' in entry.title):
                    content = extract_article_content(entry.link)
                    if content:
                        ai_news.append(News(
                            title=entry.title,
                            content=content,
                            link=entry.link,
                            source=source,
                            published=published_time
                        ))
    return ai_news
