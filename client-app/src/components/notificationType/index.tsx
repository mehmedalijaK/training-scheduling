"use client"

import { sendGetAllNotificationTypes, sendGetAllNotificationTypesAdd } from "@/api/notifications/route";
import AuthContext from "@/context/AuthContext";
import IType from "@/model/IType";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import React from "react";
import { useContext, useEffect, useState } from "react";

const NotificationType = () => {
    const {token, user, role} = useContext(AuthContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [types, setTypes] = useState<IType[] | null>([]) 
    const [typeCount, setTypeCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [format, setFormat] = useState("")

    useEffect(()=>{
        
        const fetchData = async() => {
            const response = await sendGetAllNotificationTypes(token || "", page, rowsPerPage)
            if(response.ok)
            {
                const ans = await response.json()
                console.log(ans)
                setTypeCount(ans.totalElements)
                setTypes(ans.content)
              } else {
                setTypeCount(0)
                setTypes([])
              }
        }

        fetchData()

    }, [page, rowsPerPage])

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

    
    const columns = [
        { field: "id", headerName: "ID", flex: 0.1 },
        { field: "name", headerName: "Notification name", flex: 1 },
        { field: "format", headerName: "Format", flex: 1 },
    ];

    const handleSubmit = async () => {
        if (!name?.trim()) {
            console.error('Type name is required');
            return;
        }

        if (!format?.trim()) {
            console.error('Format is required');
            return;
        }

        const response = await sendGetAllNotificationTypesAdd(token || "", {id:0, name: name, format: format})

        if(response.ok){
            setOpen(true)
            const res = await sendGetAllNotificationTypes(token || "", page, rowsPerPage)
            if(res.ok)
            {
                const ans = await res.json()
                console.log(ans)
                setTypeCount(ans.totalElements)
                setTypes(ans.content)
              } else {
                setTypeCount(0)
                setTypes([])
              }
        }

    }

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
    

    return(
        <>
            <div className="mx-36 mt-5">
                <Typography variant="h5" >All Notification types</Typography>
                <DataGrid
                    rows={types || []}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: rowsPerPage, page: page}, },
                    }}
                    
                    
                    onPaginationModelChange={async (val) => handlePageSize(val)}
                    rowCount={typeCount}
                    pageSizeOptions={[5, 10, 25]}
                    paginationMode="server"
                />

                
            </div>
            <div className=" mt-5 mx-36  ">
                    <Card>
                        <CardHeader
                        subheader=""
                        title="Add new notification type"
                        />
                        <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ p: 2 }}>
                            <Grid
                            container
                            spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={3}
                                    className="mt-5"
                                >
                                    <TextField
                                    fullWidth
                                    type="text"
                                    helperText="Please enter your notification type name"
                                    
                                    className="w-72 mx-auto"
                                    name="notificationTypeName"
                                    onChange={(e)=>{setName(e.target.value)}}
                                    required
                                    value={name}
                                    
                                    />
                                    <TextField
                                    fullWidth
                                    type="text"
                                    helperText="Please enter your new format for notification"
                                    className="w-72 mx-auto"
                                    name="newFormat"
                                    onChange={(e)=>{setFormat(e.target.value)}}
                                    required
                                    value={format}
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" className='bg-blue-500' onClick={handleSubmit}>
                            Add new type
                        </Button>
                        </CardActions>
                    </Card>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Successfully created new type"
                        action={action}
                    />
                </div>
        </>
    )
}

export default NotificationType;