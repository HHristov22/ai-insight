import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Layout from '../../components/layout/Layout';

export default function About({ darkMode, toggleDarkMode }) {
  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          About AI-INSIGHT
        </Typography>
        <Box sx={{ typography: 'body1', lineHeight: 1.8 }}>
          <Typography paragraph>
            AI-INSIGHT is your premier destination for staying informed about the latest developments
            in artificial intelligence technology. Our mission is to bridge the gap between complex
            AI advancements and accessible, comprehensive reporting.
          </Typography>
          <Typography paragraph>
            We curate and analyze the most significant AI news, bringing you insights about
            breakthrough research, industry applications, ethical considerations, and the future
            of technology.
          </Typography>
          <Typography paragraph>
            Our team of dedicated writers and AI enthusiasts works tirelessly to ensure you stay
            ahead of the curve in the rapidly evolving world of artificial intelligence.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}