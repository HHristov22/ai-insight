import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home({ darkMode, toggleDarkMode }) {
  const [articles, setArticles] = useState([]); // Празен масив по подразбиране
  const [error, setError] = useState(null); // Добавяме обработка на грешки

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        return res.json();
      })
      .then((data) => {
        const formattedData = data.map((article) => ({
          ...article,
          formattedDate: article.date
            ? new Date(article.date).toLocaleDateString()
            : 'Unknown Date',
        }));
        setArticles(formattedData);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isNewsPage={false} />
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.slug}>
                <Card
                  style={{
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {article.formattedDate}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        opacity: 0.3, // Прозрачен текст
                      }}
                    >
                      {article.content}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Link href={`/news/${article.slug}`} passHref>
                      <IconButton color="primary">
                        <ArrowForward />
                      </IconButton>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No articles available.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
