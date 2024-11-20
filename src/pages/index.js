import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div>
      <h1>AI Insight</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <h2>{article.title}</h2>
            <p>{article.date}</p>
            <p>{article.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
