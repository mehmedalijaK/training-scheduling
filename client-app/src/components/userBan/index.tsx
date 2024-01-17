import { banUser, getAllUsers, unbanUser } from "@/api/auth/route";
import { IMessage } from "@/app/notifications/page";
import AuthContext from "@/context/AuthContext";
import IUserAll from "@/model/IUserAll";
import { Box, Button, Checkbox, Chip, IconButton, Modal, Snackbar, TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React from "react";
import { useContext, useEffect, useState } from "react";

const UserBan = () => {
    const {token} = useContext(AuthContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<IUserAll[] | null>([]) 
    const [userCount, setUserCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              // @ts-ignore
              const response  = await getAllUsers(token, page, rowsPerPage);
              if (response.ok) {
                const ans = (await response.json());
                setUserCount(ans.totalElements)
                setUsers(ans.content)
              } else {
                setUserCount(0)
                setUsers([])
              }
            } catch (error) {
              //@ts-ignore
              console.error('Error:', error.message);
            }
          };
      
          fetchData();
    }, [token, page, rowsPerPage])

    useEffect(()=>{
        console.log(users)
    },[users, page, rowsPerPage])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.1 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "dateBirth", headerName: "Date of Birth", flex: 1 },
        { field: "name", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
        { field: "membershipCardId", headerName: "Membership Card ID", flex: 1 },
        { field: "scheduledTrainingCount", headerName: "Scheduled Training Count", flex: 1 },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: (params : any) => {
              const roleName = params.value.name;
              let color;
        
              switch (roleName) {
                case "ROLE_PENDING":
                  color = "info";
                  break;
                case "ROLE_CLIENT":
                  color = "success";
                  break;
                case "ROLE_MANAGER":
                  color = "secondary";
                  break;
                case "ROLE_BANNED":
                  color = "error";
                  break;
                default:
                  color = "black";
              }
        
              return (
                //@ts-ignore
                <Chip label={params.value.name} color={color}/>

              );
            },
          },
        {
            field: "banButton",
            headerName: "Ban User",
            flex: 1,
            renderCell: (params : any) => (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleBanUser(params.row.id)}
              >
                Ban
              </Button>
            ),
        },
        {
            field: "unbanButton",
            headerName: "Unban User",
            flex: 1,
            renderCell: (params : any) => (
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleUnbanUser(params.row.id)}
              >
                Unban
              </Button>
            ),
        },
    ];

    async function handleBanUser(id: any): Promise<void> {
        const response  = await banUser(token||"", id);
        if (response.ok) {
          const res  = await getAllUsers(token||"", page, rowsPerPage);
          if (res.ok) {
            const ans = (await res.json());
            setUserCount(ans.totalElements)
            setOpen(true)
            setUsers(ans.content)
          } else {
            setUserCount(0)
            setUsers([])
          }
        } else {

        }
    }

    async function handleUnbanUser(id: any): Promise<void> {
        const response  = await unbanUser(token||"", id);
        if (response.ok) {
          const res  = await getAllUsers(token||"", page, rowsPerPage);
              if (res.ok) {
                const ans = (await res.json());
                setUserCount(ans.totalElements)
                setOpenSecond(true)
                setUsers(ans.content)
              } else {
                setUserCount(0)
                setUsers([])
              }
        } else {

        }
    }

    function handlePageSize(val: GridPaginationModel): void | PromiseLike<void> {

        setPage(val.page)
        setRowsPerPage(val.pageSize)
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleCloseSecond = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSecond(false);
    };


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

    const actionSecond = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleCloseSecond}>
          CLOSE
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSecond}
        >
        </IconButton>
      </React.Fragment>
    );


    return (
        <>
          <div className="-mx-36 mt-5">
              <Typography variant="h5" >All users</Typography>
              <DataGrid
                  rows={users || []}
                  columns={columns}
                  initialState={{
                      pagination: { paginationModel: { pageSize: rowsPerPage, page: page}, },
                  }}
                  
                  
                  onPaginationModelChange={async (val) => handlePageSize(val)}
                  rowCount={userCount}
                  pageSizeOptions={[5, 10, 25]}
                  paginationMode="server"
              />            
          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Successfully banned user"
            action={action}
          />
          <Snackbar
            open={openSecond}
            autoHideDuration={6000}
            onClose={handleCloseSecond}
            message="Successfully unbanned user"
            action={actionSecond}
          />
        </>
    )
}

export default UserBan;


