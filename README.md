# AI Insight
This project is under active development.
Feedback are welcome!
---
AI Insight is an automated news aggregation platform focused on the latest developments in Artificial Intelligence (AI). The platform scrapes news articles from multiple trusted sources, processes the content to remove duplicates, and categorizes them based on AI-specific topics using state-of-the-art Natural Language Processing (NLP) models. 

## Key Features
- **Automated Scraping:** Periodically collects AI-related news from RSS feeds and websites.
- **Content Deduplication:** Uses machine learning (TF-IDF and clustering) to identify and remove duplicate articles.
- **Topic Classification:** Classifies articles into AI-related categories using a zero-shot classification model.
- **Markdown Storage:** Saves each article as a Markdown file for easy access and version control.
- **Cloud Integration:** Uses AWS Lambda for automation and AWS S3 for storing Markdown files.
- **Next.js Frontend:** Displays the aggregated news in an elegant, user-friendly interface.

## Technology Stack
- **Backend:** Python with libraries like `feedparser`, `newspaper3k`, `scikit-learn`, and `transformers`.
- **Cloud:** AWS Lambda for serverless automation and AWS S3 for storage.
- **Frontend:** Next.js for rendering and presenting news articles.
- **AI Models:** Hugging Face's `facebook/bart-large-mnli` for topic classification.

## Vision
AI Insight aims to become a go-to platform for keeping up with advancements in AI, consolidating scattered information into one accessible and streamlined platform.

## Future Enhancements
- Expand news sources for broader coverage.
- Introduce user preferences and tailored recommendations.
- Add analytics and trends visualization for AI topics.


