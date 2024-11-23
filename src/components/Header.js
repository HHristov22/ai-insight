import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import Link from 'next/link';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <AppBar position="sticky" color="primary" sx={{ backgroundColor: '#106EBE' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >

        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Righteous',
                fontSize: '42px',
                color: 'white',
                textDecoration: 'none',
                // display: 'inline-block',
                // textAlign: 'center',
              }}
            >
              AI-INSIGHT
            </Typography>
          </Link>
        </Box>

        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: 'auto' }}>
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
