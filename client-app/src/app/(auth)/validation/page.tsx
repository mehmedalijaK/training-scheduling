"use client"
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ValidationPage = () => {
    let searchParams = useSearchParams();
    const search = searchParams.get('email')
    return(
        <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />

        {/* Hero unit */}
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Please check your email for verification link we sent to your mail: {search}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
           After verification you can access your account by log
          </Typography>
        </Container>
      </ThemeProvider>
    )
}

export default ValidationPage;