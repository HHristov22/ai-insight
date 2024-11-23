from datetime import datetime

class News:
    def __init__(self, title, content, link, source, published):
        self.title = title
        self.content = content
        self.link = link
        self.source = source

        # Ensure published is a datetime object and format it as a string
        if isinstance(published, str):
            raise ValueError("The 'published' attribute must be a datetime object, not a string.")
        if not isinstance(published, datetime):
            raise ValueError("The 'published' attribute must be a valid datetime object.")
        
        self.published = published.strftime("%Y-%m-%d")  # Save the formatted date directly

    def to_markdown(self):
        """
        Generates content for the Markdown file from the object.
        """
        # Escape special characters in the title
        safe_title = self.title.replace('"', '\\"')

        return f"""---
title: "{safe_title}"
source: {self.source}
date: {self.published}
link: {self.link}
---

{self.content}
"""
