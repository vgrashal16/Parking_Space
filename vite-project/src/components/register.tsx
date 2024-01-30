import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState} from 'recoil';
import { parkingState } from '../atoms/parkingState';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register: React.FC = () => {
  const [carRegistration, setCarRegistration] = useState('');
  const [parkingTime, setParkingTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;

  const setparkState = useSetRecoilState(parkingState); 
  const regex = /[A-Z]{2}\d{2}[A-Z]{2}\d{4}/;
  const handleSetCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setParkingTime(currentTime);
  };

  const handleSubmit = () => {
    // update 
    if (regex.test(carRegistration)) {
      setparkState((prevParkState) => {
        return prevParkState.map((parkingSpace) => {
          if (parkingSpace.id === id) {
            return {
              ...parkingSpace,
              parked: true,
              parked_at: parkingTime, 
            reg_no: carRegistration,
          };
        } else {
          return parkingSpace;
        }
      });
    });
    
    navigate('/lot')
  }
  else{
    toast.error("Invalid registration number");
  }
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    <Button style={{margin: '10px'}} onClick={()=>{navigate('/lot')}} sx={{color: 'white', '&:hover': {backgroundColor: '#21242c'}}} >Go Back</Button>
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      margin="auto" 
      >
      <Typography fontSize="40px">Car Entry</Typography>
      <Box maxWidth="800px" padding= "20px" width="100%" border="2px solid white" borderRadius="20px" p={2} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <TextField
          label="Car Registration Number"
          placeholder="MP04AB1234"
          inputProps={{style: { color: 'aliceblue', backgroundColor: '#21242c', borderRadius: '10px'}}}
          InputLabelProps={{
            style: { color: 'aliceblue' },
          }}
          variant="outlined"
          value={carRegistration}
          onChange={(e) => setCarRegistration(e.target.value)}
          style={{margin: '20px', width: '95%'}}
          />
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            label="Parking Time"
            variant="outlined"
            fullWidth
            inputProps={{style: { color: 'aliceblue', backgroundColor: '#21242c', borderRadius: '10px'}}}
            InputLabelProps={{
              style: { color: 'aliceblue' },
            }}
            value={parkingTime}
            style={{margin: '20px'}}
            />
          <IconButton aria-label="Add" onClick={handleSetCurrentTime}>
            <AddIcon sx={{ color: 'white' }}/>
          </IconButton>
        </Box>
        <Button onClick={handleSubmit} disabled={carRegistration.length === 0 || parkingTime.length === 0} style={{width: '30%', alignSelf: 'center', }}  
        sx={{color: 'white', '&:disabled': {backgroundColor: 'transparent', color: 'grey'}, '&:hover': {backgroundColor: '#21242c'}}}>Submit</Button>
      </Box>
    </Box>
    </>
  );
};

export default Register;
