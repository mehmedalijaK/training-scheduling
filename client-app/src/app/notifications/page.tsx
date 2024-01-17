"use client"
import Iconify from "@/components/iconify";
import TableNoData from "@/sections/user/table-no-data";
import UserTableHead from "@/sections/user/user-table-head";
import NotificationTableRow from "@/sections/user/notification-table-row";
import UserTableToolbar from "@/sections/user/user-table-toolbar";
import { UserView } from "@/sections/user/view"
import { Button, Card, Container, Stack, Table, TableBody, TableContainer, TablePagination, TextField, Typography } from "@mui/material";
import { SetStateAction, use, useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { messages } from "@/_mock/user";
import TableEmptyRows from "@/sections/user/table-empty-rows";
import { applyFilter, emptyRows, getComparator } from "@/sections/user/utils";
import { sendGetMyNotifications, sendGetMyNotificationsFiltered } from "@/api/notifications/route";
import { useContext } from 'react';
import AuthContext, { UserRole } from "@/context/AuthContext";
import { size } from "lodash";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs }  from 'dayjs';
import AllUsersNotification from "@/components/notifications";
import NotificationType from "@/components/notificationType";

export interface IMessage {
  username: string,
  mail_receiver: string,
  message: string,
  type_name: string,
  date_sent: Date
}

const Notifications = () => {
    const [isClient, setIsClient] = useState(false);
    const {token, role} = useContext(AuthContext)

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
    const [messsageCount, setMessageCount] = useState(0)
    const [dateSent, setDateSent] = useState("23.04.2002")
    const [message, setMessage] = useState("Neka poruka")
    const [type, setType] = useState("Register poruka")
    const [filterTypeName, setFilterTypeName] = useState('')
    const [filterEmail, setFilterEmail] = useState('')
    const [filterDateFrom, setFilterDateFrom] = useState<Dayjs | null>(null);
    const [filterDatetTo, setFilterDateTo] = useState<Dayjs | null>(null);

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
  
    const handleChangePage = async (event : any, newPage : any) => {
      setPage(newPage);

      const payload = {
        type_name: filterTypeName || null,
        email: filterEmail || null,
        date_from: filterDateFrom?.toISOString() || null,
        date_to: filterDatetTo?.toISOString() || null
      }

      try {
        // @ts-ignore
        const response  = await sendGetMyNotificationsFiltered(token, newPage, rowsPerPage, payload);
        if (response.ok) {
          const ans = (await response.json());
          console.log(ans)
          setMessageCount(ans.totalElements)
          setMessages(ans.content)
        } 
        else {
          setMessageCount(0)
          setMessages([])
        }
      } catch (error) {
        
        setMessageCount(0)
        setMessages([])
        //@ts-ignore
        console.error('Error:', error.message);
      }
    };
  
    const handleChangeRowsPerPage = async (event : any) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));

      const payload = {
        type_name: filterTypeName || null,
        email: filterEmail || null,
        date_from: filterDateFrom?.toISOString() || null,
        date_to: filterDatetTo?.toISOString() || null
      }

      try {
        // @ts-ignore
        const response  = await sendGetMyNotificationsFiltered(token, 0, parseInt(event.target.value, 10), payload);
        if (response.ok) {
          const ans = (await response.json());
          console.log(ans)
          setMessageCount(ans.totalElements)
          setMessages(ans.content)
        } 
        else {
          setMessageCount(0)
          setMessages([])
        }
      } catch (error) {
        
        setMessageCount(0)
        setMessages([])
        //@ts-ignore
        console.error('Error:', error.message);
      }

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

          const payload = {
            type_name: null,
            email: null,
            date_from: null,
            date_to: null
          }

          // @ts-ignore
          const response  = await sendGetMyNotificationsFiltered(token, page, rowsPerPage, payload);
          if (response.ok) {
            const ans = (await response.json());
            setMessageCount(ans.totalElements)
            setMessages(ans.content)
          } else {
            setMessageCount(0)
            setMessages([])
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

   const hanleSubmitFilter = async (event : any) =>{

      const payload = {
        type_name: filterTypeName || null,
        email: filterEmail || null,
        date_from: filterDateFrom?.toISOString() || null,
        date_to: filterDatetTo?.toISOString() || null
      }

      try {
        // @ts-ignore
        const response  = await sendGetMyNotificationsFiltered(token, page, rowsPerPage, payload);
        if (response.ok) {
          const ans = (await response.json());
          console.log(ans)
          setMessageCount(ans.totalElements)
          setMessages(ans.content)
        } 
        else {
          setMessageCount(0)
          setMessages([])
        }
      } catch (error) {
        
        setMessageCount(0)
        setMessages([])
        //@ts-ignore
        console.error('Error:', error.message);
      }

     

   }

    return (
      <>
        <Container suppressHydrationWarning>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">My notifications</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-evenly">
            <TextField
              name="typeName"
              label="Type"
              helperText="Enter type that you want to be displayed"
              value={filterTypeName}
              onChange={(event)=>{setFilterTypeName(event.target.value)}}
              fullWidth
              margin="normal"
              sx={{ flex: 1 }}
            />
             <TextField
              name="email"
              label="Email"
              value={filterEmail}
              fullWidth
              onChange={(event)=>{setFilterEmail(event.target.value)}}
              helperText="Enter email that you want to be displayed"
              sx={{ flex: 1 }}
              margin="normal"
            /> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={filterDateFrom}
                label="Date from"
                ampm={false}
                onChange={(value) => setFilterDateFrom(value)}
                sx={{ flex: 1 }}
              />
              <DateTimePicker
                value={filterDatetTo}
                onChange={(value) => setFilterDateTo(value)}
                label="Date to"
                ampm={false}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: 'royalblue' }}
              sx={{ flex: 1 }}
              onClick={hanleSubmitFilter}
              className="max-h-12"
            >
              Submit filters
            </Button>
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
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    emptyRows={emptyRows(page, rowsPerPage, message.length)}
                  />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
            
    
            <TablePagination
              page={page}
              component="div"
              count={messsageCount || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
        {role == UserRole.ADMIN ? <AllUsersNotification/> : <></>}
        {role == UserRole.ADMIN ?  <NotificationType/> : <></>}
      </>

      );
}

export default Notifications
