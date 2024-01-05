"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const defaultTheme = createTheme();

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright Mehmedalija i Ana RAF proj © '}{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// ... (import statements)

const RegisterUserPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateBirthError, setDateBirthError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (username.trim() === '') {
      setUsernameError(true);
      return;
    }

    if (password.trim() === '') {
      setPasswordError(true);
      return;
    }

    if (email.trim() === '') {
      setEmailError(true);
      return;
    }

    if (dateBirth.trim() === '') {
      setDateBirthError(true);
      return;
    }

    if (name.trim() === '') {
      setNameError(true);
      return;
    }

    if (lastName.trim() === '') {
      setLastNameError(true);
      return;
    }

    // Your form submission logic
    console.log({
      username,
      password,
      email,
      dateBirth,
      name,
      lastName,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'royalblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register user
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              className="text-white"
              error={usernameError}
              helperText={usernameError ? 'Username is required' : ''}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(false);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError ? 'Password is required' : ''}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              required
              label="Email"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailError ? 'Email is required' : ''}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="dateBirth"
              required
              name="dateBirth"
              type="date"
              error={dateBirthError}
              helperText={dateBirthError ? 'Date of Birth is required' : ''}
              value={dateBirth}
              onChange={(e) => {
                setDateBirth(e.target.value);
                setDateBirthError(false);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="Name"
              name="name"
              autoComplete="given-name"
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              required
              name="lastName"
              autoComplete="family-name"
              error={lastNameError}
              helperText={lastNameError ? 'Last Name is required' : ''}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(false);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: 'royalblue' }}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
        {/* ... (Copyright component) */}
      </Container>
    </ThemeProvider>
  );
};

export default RegisterUserPage;