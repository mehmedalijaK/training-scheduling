"use client"
import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------


export interface INotificationTableRowProps{
  date_sent: Date,
  message: string,
  type: string,
  selected: boolean,
  handleClick: (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLTableRowElement>) => void
}

const NotificationTableRow = (props : INotificationTableRowProps) => {
  const {
    date_sent,
    message,
    type,
    selected,
    handleClick
  } = props

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event : any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{date_sent.toString()}</TableCell>

        <TableCell>{message}</TableCell>
        <TableCell>{type}</TableCell>
        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

export default NotificationTableRow;