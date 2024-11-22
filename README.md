# AI Insight
This project is under active development.
Feedback are welcome!
---
AI Insight is an automated news aggregation platform focused on the latest developments in Artificial Intelligence (AI). The platform scrapes news articles from multiple trusted sources, processes the content to remove duplicates, and categorizes them based on AI-specific topics. 

## Key Features
- **Automated Scraping:** Periodically collects AI-related news from RSS feeds and websites.
- **Markdown Storage:** Saves each news as a Markdown file for easy access.
- **Cloud Integration:** Prepared for integration with cloud storage solutions (GitHub Action)
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


### Setting Up the Project
- npm install
- python -m venv venv
    - venv\Scripts\activate or source venv/bin/activate
    - pip install -r requirements.txt
    - python .\scripts\main.py
- npm run dev
