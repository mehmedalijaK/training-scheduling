"use client"
import { filterByDay, findAllFreeAppointments, findAllSports, reserve, reserveWithSport } from "@/api/schedule/route"
import AuthContext from "@/context/AuthContext"
import IAppointment from "@/model/IAppointment"
import ISport from "@/model/ISport"
import ISportDto from "@/model/ISportDto"
import { Box, Button, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
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
    const [day, setDay] = useState('1')
    const dayWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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
        { field: "sport", headerName: "Sport", flex: 1, valueGetter: (params : any) => params.row.sport?.sportName || "Any" },
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
                variant="contained"
                className="bg-blue-600"
                onClick={async () => {
                    if(appointments?.[params.row.id].sport == null){
                        setOpen(true)
                        console.log(sports)
                        setSelectedId(params.row.id)
                    }else{
                        console.log(appointments)
                        setSelectedId(params.row.id)
                        console.log(params.row.id)
                        const payload = {
                            //@ts-ignore
                            clientId: user?.id,
                            //@ts-ignore
                            gymName: appointments[params.row.id].name,
                            //@ts-ignore
                            scheduledTime: appointments[params.row.id].scheduledTime,
                            //@ts-ignore
                            sportName: appointments[params.row.id].sport.sportName
                        }
                        console.log(payload)
                        const response = await reserve(token||"", payload)
                        if(response.ok){
                            console.log(response)
                            console.log("ok boomer")
                        }
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
        width: 300,
        p: 4,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: 4,
        textAlign: 'center',
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
            const ans = await response.json()
            console.log(ans)
        }

        
        console.log(payload)
    }

    return(
        <>
          <div className="">

              <Typography variant="h5" className="mb-3 mt-7">All available appointments</Typography>
              <Stack direction="row" spacing={2} justifyContent="flex-start" className="my-3">
                <Select
                    labelId="select-label"
                    id="select-group"
                    value={day}
                    defaultValue="1"
                    onChange={(event: SelectChangeEvent) => {
                        setDay(event.target.value as string);
                      }}
                >
                    <MenuItem value={'1'}>Monday</MenuItem>
                    <MenuItem value={'2'}>Tuesday</MenuItem>
                    <MenuItem value={'3'}>Wednesday</MenuItem>
                    <MenuItem value={'4'}>Thursday</MenuItem>
                    <MenuItem value={'5'}>Friday</MenuItem>
                    <MenuItem value={'6'}>Saturday</MenuItem>
                    <MenuItem value={'7'}>Sunday</MenuItem>
                </Select>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: 'royalblue' }}
                   
                    onClick={async ()=>{
                         //@ts-ignore
                        const dayW = dayWeek[day-1]
                        
                        const response = await filterByDay(token || "", dayW)

                        if(response.ok){
                            const ans = await response.json()
                            setAppointments(ans)
                            setAppointmentsCount(ans.length)
                            console.log(ans)
                        }



                    }}
                    className="max-h-12 w-44"
                    >
                Submit filters
                </Button>
              </Stack>
              <DataGrid
                  rows={appointments?.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage) || []}
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
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
               
                >
                    <Box sx={style}>
                        <Typography variant="h5" component="h2" mb={2}>
                        You're the first to make a reservation for this appointment
                        </Typography>
                        <Typography mt={2} mb={3}>
                        To proceed with the reservation, please select a sport.
                        </Typography>
                        <InputLabel id="select-label" sx={{ marginBottom: 1, display: 'block' }}>
                        Pick your sport
                        </InputLabel>
                        <Select
                        labelId="select-label"
                        id="simple-select"
                        value={sportName}
                        color="primary"
                        //@ts-ignore
                        onChange={(event) => setSportName(event.target.value)}
                        sx={{ width: '100%', marginBottom: 2 }}
                        >
                        {sports?.map((sportElement, index) => (
                            <MenuItem key={index} value={index}>
                            {sportElement?.sportName || ""}
                            </MenuItem>
                        ))}
                        </Select>
                        <Button variant="contained" className="bg-blue-600" onClick={submitWithSports} fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Modal>
          </div>
        </>
    )

}

export default Trainings