class News:
    def __init__(self, title, content, link, source, published):
        self.title = title
        self.content = content
        self.link = link
        self.source = source
        self.published = published

    def to_markdown(self):
        """
        Generates content for the Markdown file from the object.
        """
        # formatted_date = self.published.strftime("%d-%m-%y")
        formatted_date = self.published.strftime("%Y-%m-%d")
        return f"""---
title: "{self.title}"
source: {self.source}
date: {formatted_date}
link: {self.link}
---

{self.content}
"""
