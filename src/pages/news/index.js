import React from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';
import NewsGrid from '../../components/home/NewsGrid';

export default function NewsPage({ articles, darkMode, toggleDarkMode }) {
  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Latest AI News
        </Typography>
        <NewsGrid articles={articles} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const newsDirectory = path.join(process.cwd(), 'news');
  const filenames = fs.readdirSync(newsDirectory);

  const articles = filenames.map(filename => {
    const filePath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Конвертираме Date обекта в ISO string
    const date = data.date ? new Date(data.date).toISOString() : null;
    
    return {
      slug: filename.replace('.md', ''),
      ...data,
      date, // използваме конвертирания ISO string
      content,
      formattedDate: date 
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
        : 'Unknown Date'
    };
  });

  // Сортираме използвайки ISO string датите
  const sortedArticles = articles.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return {
    props: {
      articles: sortedArticles
    }
  };
}