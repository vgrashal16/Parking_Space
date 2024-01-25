import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState} from 'recoil';
import { parkingState } from '../atoms/parkingState';
import { useLocation, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [carRegistration, setCarRegistration] = useState('');
  const [parkingTime, setParkingTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;

  const setparkState = useSetRecoilState(parkingState); 

  const handleSetCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setParkingTime(currentTime);
  };

  const handleSubmit = () => {
    // update 
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
  };

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      margin="auto" 
      >
      <Typography fontSize="40px">Car Entry</Typography>
      <Box maxWidth="800px" padding= "20px" width="100%" border="4px solid black" borderRadius="20px" p={2} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <TextField
          label="Car Registration Number"
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
            value={parkingTime}
            disabled={true}
            style={{margin: '20px'}}
            
            />
          <IconButton aria-label="Add" onClick={handleSetCurrentTime}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button onClick={handleSubmit} disabled={carRegistration.length === 0 || parkingTime.length === 0}>Submit</Button>
      </Box>
    </Box>
    </>
  );
};

export default Register;
