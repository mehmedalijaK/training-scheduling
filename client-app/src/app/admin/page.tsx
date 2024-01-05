"use client"

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UserView } from '../../sections/user/view/';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <HelmetProvider>
          <Helmet>
            <title> User | Minimal UI </title>
          </Helmet>
          <UserView />
      </HelmetProvider>
    </>
  );
}
