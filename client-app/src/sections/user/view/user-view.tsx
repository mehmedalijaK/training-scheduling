"use client"
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import dynamic from 'next/dynamic'

import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getAllUsers } from '@/api/auth/route';
import AuthContext from "@/context/AuthContext";

const UserPage = () => {
  const [isClient, setIsClient] = useState(false);
  const {token} = useContext(AuthContext);
  const [user, SetUser] = useState()

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

     // @ts-ignore
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

     // @ts-ignore
  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //        // @ts-ignore
  //     const newSelecteds = user?.map((n) => n.name);
  //     setSelected(newSelecteds);
  //   } else {
  //     setSelected([]);
  //   }
  // };

     // @ts-ignore
  const handleClick = (event, name) => {
       // @ts-ignore
    const selectedIndex = selected.indexOf(name);
       // @ts-ignore
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    // @ts-ignore
    setSelected(newSelected);
  };

     // @ts-ignore
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

     // @ts-ignore
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

     // @ts-ignore
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: user,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        // @ts-ignore
        const response  = await getAllUsers(token, page, rowsPerPage);
        if (response.ok) {
          const ans = (await response.json());
          console.log(ans)
          
          console.log(ans)
        } else {
        

        }
      } catch (error) {
        //@ts-ignore
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container suppressHydrationWarning>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        {isClient && (
             // @ts-ignore
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        )}
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

       
        {/* <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 100 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              
              rowCount={user.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'username', label: 'Username' },
                { id: 'name', label: 'Name' },
                { id: 'lastName', label: 'Last name' },
                { id: 'email', label: 'Email' },
                { id: 'dateBirth', label: 'Date Birth' },
                { id: 'membershipCardId', label: 'Membership Card Id' },
                { id: 'scheduledTrainingCount', label: 'Scheduled Training Count' },
              ]}
            />
             <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    lastName={row.lastName}
                    email={row.email}
                    dateBirth={row.dateBirth}
                    username={row.username}
                    membershipCardId={row.membershipCardId}
                    scheduledTrainingCount={row.scheduledTrainingCount}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}
              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, user.length)}
              />
              {notFound && <TableNoData query={filterName} />}
            </TableBody> 
          </Table>
        </TableContainer> */}
        

        {/* <TablePagination
          page={page}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(UserPage), {
  ssr: false
})