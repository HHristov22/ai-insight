import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.siteTitle}>AI Insight</h1>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`} className={styles.card}>
            <h2 className={styles.newsTitle}>{article.title}</h2>
            <p>{article.date}</p>
            <p>{article.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
