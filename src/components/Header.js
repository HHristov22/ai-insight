import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import Link from 'next/link';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <AppBar position="sticky" color="primary" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >

        {/* Централен текст */}
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Righteous', // Използване на персонализирания шрифт
                fontSize: '24px',
                color: 'white',
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              AI-INSIGHT
            </Typography>
          </Link>
        </Box>

        {/* Бутон за смяна на тема */}
        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: 'auto' }}>
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
