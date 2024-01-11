import IUser from '@/model/IUser';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };

  export interface IAccountProfileProps {
    user : IUser
  }
  
  export const AccountProfile = (props : IAccountProfileProps) => {
    const{
      user
    } = props
    return(
      <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={""}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name + " " + user.lastName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            <p className='text-center font-semibold mt-2'>Username</p>
            {user.username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            <p className='text-center font-semibold mt-2'>Email</p>
            {user.email}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            <p className='text-center font-semibold mt-2'>Membership Card Id</p>
            {user.membershipCardId}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            className='text-center'
          >
            <p className='text-center font-semibold mt-2'>Count of scheduled trainings</p>
            {user.scheduledTrainingCount}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
    )
  
  };