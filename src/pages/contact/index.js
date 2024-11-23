import React from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import Layout from '../../components/layout/Layout';

export default function Contact({ darkMode, toggleDarkMode }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add contact form submission logic here
  };

  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Contact Us
        </Typography>
        <Paper sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="message"
              label="Message"
              id="message"
              multiline
              rows={4}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}