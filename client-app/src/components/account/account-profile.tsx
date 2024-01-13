import IManager from '@/model/IManager';
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

  export interface IAccountProfileProps {
    user : IUser | IManager
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
            textAlign={'center'}
          >
            <p className='text-center font-semibold mt-2'>Username</p>
            {user.username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            textAlign={'center'}
          >
            <p className='text-center font-semibold mt-2'>Email</p>
            {user.email}
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
            textAlign={'center'}
          >
            <p className='text-center font-semibold mt-2'>Date of birth</p>
            {user.dateBirth.toString()}
          </Typography>

          {(user as IManager).sportsHall ? <>
              <Typography
              color="text.secondary"
              variant="body2"
              textAlign={'center'}
            >
              <p className='text-center font-semibold mt-2'>Sports hall</p>
              {(user as IManager).sportsHall}
            </Typography>
          </> : <></>}
            
          {(user as IManager).dateEmployment ? <>
            <Typography
              color="text.secondary"
              variant="body2"
              textAlign={'center'}
            >
              <p className='text-center font-semibold mt-2'>Employment date</p>
              {(user as IManager).dateEmployment.toString()}
            </Typography>
          </>:<></>}

          {(user as IUser).membershipCardId ? <>
            <Typography
            color="text.secondary"
            variant="body2"
            textAlign={'center'}
          >
            <p className='text-center font-semibold mt-2'>Membership Card Id</p>
            {(user as IUser).membershipCardId}
          </Typography>
          </>:<></>}

          {(user as IUser).scheduledTrainingCount ? <>
            <Typography
            color="text.secondary"
            variant="body2"
            textAlign={'center'}
          >
            <p className='text-center font-semibold mt-2'>Count of scheduled trainings</p>
            {(user as IUser).scheduledTrainingCount}
          </Typography>
          </>:<></>}
        </Box>
      </CardContent>
      <Divider />
    </Card>
    )
  
  };