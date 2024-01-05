"use client"
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {

  const {authenticated} = useContext(AuthContext);
  const router = useRouter();


  return (
    <ThemeProvider theme={defaultTheme}>
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Training scheduling
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
          This project is intended for RAF, where users have the capability to schedule trainings, generate training sessions, prohibit user access, and establish user profiles.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" className='bg-blue-500' href="/login">Login</Button>
            <Button variant="outlined" href = "https://github.com/mehmedalijaK/training-scheduling">Source code</Button>
          </Stack>
        </Container>
      </Box>
    </main>
  </ThemeProvider>
  )
}
