"use client"
import Iconify from "@/components/iconify";
import TableNoData from "@/sections/user/table-no-data";
import UserTableHead from "@/sections/user/user-table-head";
import NotificationTableRow from "@/sections/user/notification-table-row";
import UserTableToolbar from "@/sections/user/user-table-toolbar";
import { UserView } from "@/sections/user/view"
import { Button, Card, Container, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { SetStateAction, use, useEffect, useState } from "react";
//import { messages } from "@/_mock/user";
import TableEmptyRows from "@/sections/user/table-empty-rows";
import { applyFilter, emptyRows, getComparator } from "@/sections/user/utils";
import { sendGetMyNotifications } from "@/api/notifications/route";
import { useContext } from 'react';
import AuthContext from "@/context/AuthContext";

export interface IMessage {
  username: string,
  mail_receiver: string,
  message: string,
  type_name: string,
  date_sent: Date
}

const Notifications = () => {
    const [isClient, setIsClient] = useState(false);
    const {token} = useContext(AuthContext)

    useEffect(() => {
      setIsClient(true);
    }, []);
    
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [messages, setMessages] = useState<IMessage[] | null>([]) 
    const [dateSent, setDateSent] = useState("23.04.2002")
    const [message, setMessage] = useState("Neka poruka")
    const [type, setType] = useState("Register poruka")

    const handleSort = (event: any, id: SetStateAction<string>) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    };
  
    const handleSelectAllClick = (event: { target: { checked: any; }; }) => {
      if (event.target.checked) {
        const newSelecteds = messages?.map((n) => n.message);
        // @ts-ignore
        setSelected(newSelecteds);
      } else {
        setSelected([]);
      }
    };
  
    const handleClick = (event :any, name :any) => {
      // @ts-ignore
      const selectedIndex = selected.indexOf(name);
      let newSelected: any[] | ((prevState: never[]) => never[]) = [];
  
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
  
    const handleChangePage = (event : any, newPage : any) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event : any) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    };
  
    const handleFilterByName = (event : any) => {
      setPage(0);
      setFilterName(event.target.value);
    };
  
    const dataFiltered = applyFilter({
      inputData: messages,
      comparator: getComparator(order, orderBy),
      filterName,
    });
  
    const notFound = !dataFiltered.length && !!filterName;

    useEffect(() => {
      const fetchData = async () => {
        try {
          // @ts-ignore
          const response  = await sendGetMyNotifications(token);
          if (response.ok) {
            const ans = (await response.json());
            setMessages(ans.content)
          } else {
          }
        } catch (error) {
          //@ts-ignore
          console.error('Error:', error.message);
        }
      };
  
      fetchData();
    }, []);

    useEffect(()=>{
      const newSelecteds = messages?.map((n) => n.message);
      // @ts-ignore
      setSelected(newSelecteds);

    }, [messages])


    return (
        <Container suppressHydrationWarning>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Notifications</Typography>
          </Stack>
          <Card>
           
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 100 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={messages?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'date_sent', label: 'Date sent' },
                    { id: 'message', label: 'Message' },
                    { id: 'type', label: 'Type' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row : IMessage, index: any) => (
                      <NotificationTableRow
                        key={index}
                        date_sent={row.date_sent}
                        message={row.message}
                        type={row.type_name}
                        // @ts-ignore
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.message)}
                      />
                    ))}
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, messages?.length)}
                  />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
            
    
            <TablePagination
              page={page}
              component="div"
              count={messages?.length || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      );
}

export default Notifications