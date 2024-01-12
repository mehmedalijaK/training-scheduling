import { useCallback, useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Snackbar,
  IconButton
} from '@mui/material';
import { IAccountProfileProps } from './account-profile';
import React from 'react';
import AuthContext from '@/context/AuthContext';

export const AccountProfileDetails = (props : IAccountProfileProps) => {
  const{
    user
  } = props

  const [name, setName] = useState<string>(user.name)
  const [lastName, setLastName] = useState<string>(user.lastName)
  const [email, setEmail] = useState<string>(user.email)
  const [dateBirth, setDateBirth] = useState(user.dateBirth)
  const [open, setOpen] = useState(false);
  const {editUser} = useContext(AuthContext)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSubmit = async () => {
    if (!name.trim()) {
      console.error('Name is required');
      return;
    }

    // Validate the lastName field
    if (!lastName.trim()) {
      console.error('Last name is required');
      return;
    }

    // Validate the email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      console.error('Invalid email address');
      return;
    }

    // Validate the dateBirth field
    const isValidDate = (dateString: string) => !isNaN(Date.parse(dateString));
    //@ts-ignore
    if (!dateBirth || !isValidDate(dateBirth)) {
      console.error('Invalid date of birth');
      return;
    }

    const response = await editUser(email, dateBirth, name, lastName);
    if (response.ok) {
        setOpen(true)
    } else
      console.log("error")

    console.log("ok")
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );
    

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                  value={name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={(e)=>{setLastName(e.target.value)}}
                  required
                  value={lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  value={email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  name="dateBirth"
                  onChange={(e)=>{//@ts-ignore
                    setDateBirth(e.target.value)}}
                  type="date"
                  value={dateBirth}
                  helperText="Please specify your birth date"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" className='bg-blue-500' onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Successfully updated your info"
        action={action}
      />
    </form>
  );
};