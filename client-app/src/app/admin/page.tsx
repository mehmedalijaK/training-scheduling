"use client"

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UserView } from '../../sections/user/view/';
import UserBan from '@/components/userBan';
import ManagerBan from '@/components/managerBan';
import NotificationType from '@/components/notificationType';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <UserBan />
      <ManagerBan />
    </>
  );
}
