"use client"
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { AccountProfile } from '@/components/account/account-profile';
import { AccountProfileDetails } from '@/components/account/account-profile-details';
import AuthContext, { ProtectedRoute, UserRole } from '@/context/AuthContext';
import { useContext } from 'react';
import IUser from '@/model/IUser';
const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    },
    {
      value: 'los-angeles',
      label: 'Los Angeles'
    }
  ];
  

  const EditPage = () => {

    const {role, user} = useContext(AuthContext);
    console.log(user)

    return(
      <ProtectedRoute>
      <Head>
        <title>
          Account | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  {role == UserRole.USER ? <AccountProfile user={user as IUser}/> : <></>}
                  
                  
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  {role == UserRole.USER ? <AccountProfileDetails user={user as IUser}/> : <></>}
                  
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </ProtectedRoute>
    )
  };

export default EditPage;