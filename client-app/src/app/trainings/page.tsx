"use client"
import { findAllFreeAppointments } from "@/api/schedule/route"
import AuthContext from "@/context/AuthContext"
import IAppointment from "@/model/IAppointment"
import { Button, Typography } from "@mui/material"
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid"
import { useContext, useEffect, useState } from "react"

const Trainings = () => {

    const {token} = useContext(AuthContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [appointments, setAppointments] = useState<IAppointment[] | null>()
    const [appointmentsCount, setAppointmentsCount] = useState(0)



    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response  = await findAllFreeAppointments(token || "")
                if(response.ok){
                    const ans = await response.json()
                    setAppointments(ans)
                    setAppointmentsCount(ans.length)
                    console.log(ans)
                }
            }catch(error)
            {  
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.1 },
        { field: "name", headerName: "Gym name", flex: 1 },
        { field: "scheduledTime", headerName: "Scheduled Time", flex: 1 },
        { field: "shortDescription", headerName: "Short description", flex: 1 },
        { field: "trainingDuration", headerName: "Training duration", flex: 1 },
        {
            field: "schedule",
            headerName: "Schedule this training",
            flex: 1,
            renderCell: (params : any) => (
              <Button
                variant="outlined"
                color="success"
                onClick={() => {}}
              >
                Schedule
              </Button>
            ),
        },
    ];

    function handlePageSize(val: GridPaginationModel): void | PromiseLike<void> {

        setPage(val.page)
        setRowsPerPage(val.pageSize)
    }

    return(
        <>
          <div className="-mx-36">
              <Typography variant="h5" >All free appointments</Typography>
              <DataGrid
                  rows={appointments || []}
                  columns={columns}
                  initialState={{
                      pagination: { paginationModel: { pageSize: rowsPerPage, page: page}, },
                  }}
                  
                  onPaginationModelChange={async (val) => handlePageSize(val)}
                  rowCount={appointmentsCount}
                  pageSizeOptions={[5, 10, 25]}
                  paginationMode="server"
              />
                      
          </div>
        </>
    )

}

export default Trainings