import React from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';

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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const filePath = path.join(process.cwd(), 'news', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const date = data.date ? new Date(data.date).toISOString() : null;

  return {
    props: {
      title: data.title || 'Untitled',
      date: date,
      formattedDate: date 
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
        : 'Unknown Date',
      content: content ? content.split('\n') : [],
    },
  };
}

export default function NewsPage({ 
  title, 
  formattedDate, 
  content, 
  darkMode, 
  toggleDarkMode 
}) {
  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'justify' }}>
          {title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          gutterBottom
        >
          {formattedDate}
        </Typography>
        {content.map((paragraph, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            paragraph 
            sx={{ textAlign: 'justify' }}
          >
            {paragraph.trim()}
          </Typography>
        ))}
      </Container>
    </Layout>
  );
}