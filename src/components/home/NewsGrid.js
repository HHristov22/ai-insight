import React from 'react';
import { Grid, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

export default function NewsGrid({ articles, error }) {
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {`Error: ${error}`}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.slug}>
            <Card
              sx={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
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
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 1
                  }}
                >
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {article.formattedDate}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    opacity: 0.7
                  }}
                >
                  {article.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
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
        <Typography variant="body1" color="text.secondary" align="center">
          No articles available.
        </Typography>
      )}
    </Grid>
  );
}