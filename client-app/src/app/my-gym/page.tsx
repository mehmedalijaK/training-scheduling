"use client"
import { editGymByGymId, findGymByManagerId } from "@/api/schedule/route";
import AuthContext from "@/context/AuthContext";
import { IEditGym } from "@/model/IEditGym";
import { IGym } from "@/model/IGym";
import IManager from "@/model/IManager";
import { Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react"

const MyGymPage = () => {
    const {role, user, token, editManager} = useContext(AuthContext);
    const [gym, setGym] = useState<IGym | null>();
    const [error, setError] = useState<string | null>('');
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: gym?.name,
        numberOfCoaches: gym?.numberOfCoaches,
        shortDescription: gym?.shortDescription,
        trainingDuration: gym?.trainingDuration,
      });
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
    
      const handleSubmit = async (e : any) => {
        e.preventDefault();
        // Add your logic to handle form submission, e.g., sending data to the server

        if (!formData.name || !formData.numberOfCoaches || !formData.trainingDuration) {
            setError('All fields must be filled');
            return;
        }
      
          //@ts-ignore
        const numberOfCoaches = parseInt(formData.numberOfCoaches, 10);
        //@ts-ignore
        const trainingDuration = parseInt(formData.trainingDuration, 10);
    
        if (isNaN(numberOfCoaches) || isNaN(trainingDuration) || numberOfCoaches < 1 || trainingDuration < 1) {
            setError('Number of coaches must be a valid number greater than 0, and Training duration must be a valid number');
            return;
        }
    
        // Reset error state
        setError(null);

        const response = await editManager((user as IManager).email, (user as IManager).dateBirth, 
        (user as IManager).name, (user as IManager).lastName, formData.name, (user as IManager).dateEmployment);
        if(response.ok){
            const ans = await response.json()
            const payload : IEditGym = {
                manager_id: (user as IManager).id,
                name: formData.name,
                numberOfCoaches: formData.numberOfCoaches,
                shortDescription: formData.shortDescription || "",
                trainingDuration: formData.trainingDuration
            }
            console.log(payload)
            const res = await editGymByGymId(token||"", gym?.id || 0, payload)
            if(res.ok){
                const answ = await res.json()
                setOpen(true)
                console.log(answ)
            }
        }
      };
    
    useEffect(()=>{
        const fetchData = async () => {
            const response  = await findGymByManagerId(token || "", (user as IManager).id);
            if(response.ok){
                const ans = await response.json()
                setGym(ans)
                setFormData({
                    name: ans.name || '',
                    numberOfCoaches: ans.numberOfCoaches || '',
                    shortDescription: ans.shortDescription || '',
                    trainingDuration: ans.trainingDuration || '',
                  });
            }
        }
        fetchData()
    },[])

    useEffect(()=>{
        console.log(gym)
    }, [gym])

    return (
        <>
              <Box
                boxShadow={3}
                p={3}
                borderRadius={8}
                bgcolor="white"
                maxWidth={400}
                margin="auto"
                mt={4}
                >
                <Typography variant="h5" gutterBottom>
                    Edit your gym information:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    variant="outlined"
                    name="name"
                    helperText="Enter your new gym name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    variant="outlined"
                    name="numberOfCoaches"
                    helperText="Enter your new number of coaches"
                    type="number"
                    value={formData.numberOfCoaches}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    variant="outlined"
                    name="shortDescription"
                    type="text"
                    helperText="Enter your new short description"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    variant="outlined"
                    name="trainingDuration"
                    helperText="Enter new training count"
                    type="number"
                    value={formData.trainingDuration}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    />
                    <Button type="submit" variant="contained" className="bg-blue-500 mt-5" fullWidth>
                        Submit
                    </Button>
                    {error && (
                        <Box mt={2} p={2} borderRadius={4} bgcolor="rgba(255, 0, 0, 0.1)">
                        <Typography color="error">{error}</Typography>
                        </Box>
                    )}
                </form>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Successfully updated your info"
                action={action}
            />
        </>
    )
}

export default MyGymPage    