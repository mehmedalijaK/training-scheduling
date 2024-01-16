"use client"
import { findAllFreeAppointments, findAllSports, reserveWithSport } from "@/api/schedule/route"
import AuthContext from "@/context/AuthContext"
import IAppointment from "@/model/IAppointment"
import ISport from "@/model/ISport"
import ISportDto from "@/model/ISportDto"
import { Box, Button, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material"
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid"
import { useContext, useEffect, useState } from "react"

const Trainings = () => {

    const {token, user} = useContext(AuthContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [appointments, setAppointments] = useState<IAppointment[] | null>()
    const [sports, setSports] = useState<ISportDto[] | null>()
    const [sportName, setSportName] = useState(0);
    const [appointmentsCount, setAppointmentsCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState()


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

        const fetchSports = async() => {
            try{
                const response  = await findAllSports(token || "")
                if(response.ok){
                    const ans = await response.json()
                    setSports(ans)
                    console.log(ans)
                }
            }catch(error)
            {  
                console.log(error)
            }
        }


        fetchData()
        fetchSports()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.1 },
        { field: "name", headerName: "Gym name", flex: 1 },
        { field: "sport", headerName: "Sport", flex: 1, valueGetter: (params : any) => params.row.sport?.name || "Any" },
        { 
            field: "scheduledTime", 
            headerName: "Scheduled Time", 
            flex: 1, 
        },
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
                onClick={() => {
                    if(appointments?.[params.row.id].sport == null){
                        setOpen(true)
                        console.log(sports)
                        setSelectedId(params.row.id)
                    }
                       
                }}
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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    async function submitWithSports(event: any): Promise<void> {
        setOpen(false)
        console.log(appointments?.[selectedId || 0])

        const payload = {
            sportName: sports?.[sportName].sportName,
            //@ts-ignore
            clientId: user?.id,
            //@ts-ignore
            gymName: appointments[selectedId].name,
            //@ts-ignore
            scheduledTime: appointments[selectedId].scheduledTime
        }
        
        const response = await reserveWithSport(token||"", payload)
        if(response.ok){
            console.log(response)
        }

        
        console.log(payload)
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
                <Modal
                  open={open}
                  onClose={()=>{
                    setOpen(false)
                }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      You're first who is making reservation for this appointment
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      To proceed making reservation you need to pick sport
                    </Typography>
                    <div className="mt-3">
                        <InputLabel id="select-label" className={'text-black'}>
                            Pick your sport
                        </InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            className=""
                            //@ts-ignore
                            value={sportName}
                            defaultValue="1"
                            color="primary"
                            onChange={(event) => {
                                //@ts-ignore
                            setSportName(event.target.value);
                            }}
                        >
                            {sports?.map((sportElement, index) => (
                            <MenuItem key={index} value={index}>
                                {sportElement?.sportName || ""}
                            </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <Button className="mt-3 " variant="outlined" onClick={submitWithSports}>Submit</Button>

                  </Box>
                </Modal>  
          </div>
        </>
    )

}

export default Trainings