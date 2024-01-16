"use client"

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UserView } from '../../sections/user/view/';
import UserBan from '@/components/userBan';
import ManagerBan from '@/components/managerBan';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <UserBan />
      <ManagerBan />
    </>
  );
}
