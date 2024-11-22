import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../../components/Header';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const dirPath = path.join(process.cwd(), 'news');
  const filenames = fs.readdirSync(dirPath);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: false, // Страницата се генерира само ако slug съществува
  };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  // Четене на Markdown файл
  const filePath = path.join(process.cwd(), 'news', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Форматиране на датата в текстов низ
  const formattedDate = data.date
    ? new Date(data.date).toISOString() // ISO 8601 формат
    : null;

  return {
    props: {
      title: data.title || 'Untitled',
      date: formattedDate, // Преобразувана дата
      content: content ? content.split('\n') : [], // Съдържание, разделено на редове
    },
  };
}

export default function NewsPage({ title, date, content, darkMode, toggleDarkMode }) {
  // Форматиране на дата за показване
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown Date';

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isNewsPage={true} />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {formattedDate}
        </Typography>
        {content.map((paragraph, index) => (
          <Typography key={index} variant="body1" paragraph style={{ textAlign: 'justify' }}>
            {paragraph.trim()}
          </Typography>
        ))}
      </Container>
    </>
  );
}
