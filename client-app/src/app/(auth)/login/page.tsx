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
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { sendGetMyselfManager } from '@/api/auth/route';
import { addTrainingToGym, schedulerAddGym } from '@/api/schedule/route';

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

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('1');
  const router = useRouter();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {loginUser, loginManager, user, getManager} = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    // Your form submission logic
    console.log({
      username,
      password,
      type,
    });

    if(type=='1'){
      const {response, data} = await loginUser(username, password);
      if (response.ok) {
          await router.push("/");
          console.log(user)
      } else
        console.log("error")
    }else{
      const {response, data} = await loginManager(username, password);
      if (response.ok) {
          //@ts-ignore
          const res = await sendGetMyselfManager(data?.access_token)
          if(res.ok){
            const manager = (await res.json());
            //@ts-ignore
            const resp = await schedulerAddGym(data?.access_token, manager.sportsHall, "", 1, 1, manager.id)
            if(resp.ok)console.log()
            const resp1 = await addTrainingToGym(data?.access_token, "pilates", false, manager.sportsHall, "", 6, 1500)
            const resp2 = await addTrainingToGym(data?.access_token, "powerlifting", true, manager.sportsHall, "", 6, 2500)
              if(resp1.ok && resp2.ok)
                await router.push("/");
           
          }
      } else
        console.log("error")
    }


  };

  const {authenticated} = useContext(AuthContext);

  useEffect(() => {
      if(authenticated)
          router.push("/");
  }, [authenticated])

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'royalblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <InputLabel id="select-label">User type</InputLabel>
            <Select
              labelId="select-label"
              id="select-group"
              value={type}
              label="Type"
              defaultValue="1"
              onChange={handleChange}
            >
              <MenuItem value={'1'}>Client</MenuItem>
              <MenuItem value={'2'}>Manager</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: 'royalblue' }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
              <Link href="/register/user" variant="body2">
                  {"Don't have an account? Sign Up as User"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register/manager" variant="body2">
                  {"Don't have an account? Sign Up as Manager"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
