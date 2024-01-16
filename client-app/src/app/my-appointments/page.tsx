"use client"

import { cancelMyReservation, findMyReservations } from "@/api/schedule/route"
import AuthContext from "@/context/AuthContext"
import { IAppointmentDto } from "@/model/IAppointmentDto"
import { Button, Chip, IconButton, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid"
import React, { use } from "react"
import { useContext, useEffect, useState } from "react"


const MyAppointmentsPage = () => {

    const {token, user} = useContext(AuthContext)
    const [appointments, setAppointments] = useState<IAppointmentDto[] | null>()
    const [appointmentCount, setAppointmentsCount] = useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        const fetchData = async () =>{
            //@ts-ignore
            const response = await findMyReservations(token || "", user?.id)

            if(response.ok){
                const ans = await response.json()
                console.log(ans)
                setAppointments(ans)
                setAppointmentsCount(ans.length)
            }
        }

        fetchData()
    },[])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.1 },
        { field: "gymName", headerName: "Gym name", flex: 1 },
        {
            field: "individual",
            headerName: "Individual",
            flex: 1,
            renderCell: (params : any) => {
              const roleName = params.row.individual;
              let labelText = ""
              let color;
        
              switch (roleName) {
                case true:
                  color = "success";
                  labelText = "Yes"
                  break;
                case false:
                  color = "error";
                  labelText = "No"
                  break;
                default:
                  color = "black";
              }
    
              return (
                //@ts-ignore
                <Chip label={labelText} color={color}/>

              );
            },
        },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "scheduledTime", headerName: "Scheduled Time", flex: 1 },
        { field: "shortDescription", headerName: "Short Description", flex: 1 },
        { field: "sportName", headerName: "Sport Name", flex: 1 },
        { field: "trainingDuration", headerName: "Training Duration", flex: 1 },
        {
            field: "cancel",
            headerName: "Cancel this training",
            flex: 1,
            renderCell: (params : any) => (
              <Button
                variant="contained"
                color="error"
                className="bg-red-500"
                onClick={async () => {
                    
                    console.log(params.row.id) 
                    //@ts-ignore
                    const response = await cancelMyReservation(token||"", params.row.id, user?.id);
                    if(response.ok){
                        console.log(response)
                        setOpen(true)
                    }
                      
                }}
              >
                Cancel
              </Button>
            ),
        },

    ];

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

    return (
        <>
            <div>
                <Typography variant="h5" className="mb-3 mt-7">All my appointments</Typography>
                <DataGrid
                  rows={appointments?.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage) || []}
                  columns={columns}
                  initialState={{
                      pagination: { paginationModel: { pageSize: rowsPerPage, page: page}, },
                  }}
                  
                  onPaginationModelChange={async (val) => handlePageSize(val)}
                  rowCount={appointmentCount}
                  pageSizeOptions={[5, 10, 25]}
                  paginationMode="server"
                />
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Successfully updated your info"
                    action={action}
                />
            </div>
        </>
    )
}

export default MyAppointmentsPage