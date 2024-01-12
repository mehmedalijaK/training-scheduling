import { changePasswordUser } from "@/api/auth/route";
import AuthContext from "@/context/AuthContext";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Snackbar, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";

const AccountChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [open, setOpen] = useState(false);
    const {token} = useContext(AuthContext);

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    
    const handleSubmit = async () => {
        if (!currentPassword?.trim()) {
            console.error('Current password is required');
            return;
        }

        if (!newPassword?.trim()) {
            console.error('New password is required');
            return;
        }

        const response = await changePasswordUser(currentPassword, newPassword, token || "");
        if (response.ok) {
            setOpen(true)
        } else
        console.log("error")

        console.log("ok")
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

    return<>
        <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="mx-44 mt-10 items-center"
        >
        <Card>
            <CardHeader
            subheader="The information can be edited"
            title="Profile"
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
                        className="mx-auto"
                    >
                        <TextField
                        fullWidth
                        type="password"
                        helperText="Please enter your current password"
                        label="Current password"
                        name="currentPassword"
                        onChange={(e)=>{setCurrentPassword(e.target.value)}}
                        required
                        value={currentPassword}
                        
                        />
                        <TextField
                        fullWidth
                        type="password"
                        label="New password"
                        name="newPassword"
                        onChange={(e)=>{setNewPassword(e.target.value)}}
                        required
                        value={newPassword}
                        />
                    </Grid>

                </Grid>
            </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" className='bg-blue-500' onClick={handleSubmit}>
                Update your password
            </Button>
            </CardActions>
        </Card>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Successfully updated your password"
            action={action}
        />
        </form>
    </>

}

export default AccountChangePassword;