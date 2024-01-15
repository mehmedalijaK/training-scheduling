"use client"

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UserView } from '../../sections/user/view/';
import UserBan from '@/components/userBan';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <UserBan />
    </>
  );
}
